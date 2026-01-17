import axios from 'axios';
import { forexData } from '../data/forex-data';

// --- CONFIGURATION ---
const BASE_URL = 'https://ai.nospace.network';
const API_KEY = 'Y72P38Y-ZX7MNM4-Q1SCY84-B3SF5DS';
const TARGET_WORKSPACE = 'ren-workspace';
// System prompt to make the AI act like a "real ChatGPT" (helpful, versatile) while keeping persona
const SYSTEM_PROMPT = `You are Rosie Pham's intelligent AI Assistant.
Your core traits:
1. Helpful & Versatile: Answer any questions the user has, whether about trading, coding, writing, or general knowledge.
2. Professional & Friendly: Maintain a polite, expert tone ("Calm, Professional, Expert").
3. Context-Aware: Use provided document context if relevant, but do NOT limit yourself to it. If the context doesn't have the answer, use your general knowledge to help the user.
4. Goal: Provide the best possible assistance to the user.

WEBSITE CONTEXT:
- Name: Rosie Pham Official
- Mission: A premium trading signal community focusing on Gold (XAUUSD) and Crypto (BTC/ETH).
- Services: Copy Trading, High-Quality Signals, Telegram Group Access.
- "This Website": This is the official hub for Rosie Pham's community.
`;

export interface StorageResult {
    success: boolean;
    workspace: string;
    location?: string;
    step?: string;
    error?: string;
}

interface UploadResponse {
    success?: boolean;
    documents?: { location: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// --- UTILS ---

export interface ChatMessage {
    role: string;
    content: string;
}

export function createSessionId(prefix = 'ai'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// --- API 1: CHAT / REWRITE ---

export async function callChatAI(message: string, sessionId?: string): Promise<string> {
    const finalSessionId = sessionId || createSessionId('chat');

    // The endpoint as per the user's specific script requests
    const CHAT_URL = `${BASE_URL}/api/v1/workspace/${TARGET_WORKSPACE}/chat`;

    try {
        console.log(`[AI Chat] Sending message to ${CHAT_URL} (Session: ${finalSessionId})`);

        const response = await axios.post(CHAT_URL, {
            message: message,
            mode: 'chat',
            sessionId: finalSessionId,
            reset: false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            timeout: 120000, // 2 minutes timeout as per script
            validateStatus: s => s >= 200 && s < 500
        });

        const d = response.data;
        let responseText = '';

        // Robust response text extraction
        if (typeof d === 'string') responseText = d;
        else if (d?.textResponse) responseText = d.textResponse;
        else if (d?.text) responseText = d.text;
        else if (d?.response) responseText = d.response;
        else if (d?.message) responseText = d.message;
        else responseText = JSON.stringify(d); // Fallback

        if (!responseText || !responseText.trim()) {
            console.warn("[AI Chat] Empty response received");
            return "I received an empty response from the server.";
        }

        return responseText;

    } catch (error) {
        console.error("[AI Chat] API Call Failed:", error);
        if (axios.isAxiosError(error)) {
            return `Connection Error: ${error.message}`;
        }
        return "An unexpected error occurred while communicating with the AI.";
    }
}

// --- CONTEXT GATHERING ---

async function fetchLiveCryptoPrice(coinId: string): Promise<string> {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`);
        if (response.data && response.data[coinId]) {
            const data = response.data[coinId];
            const price = data.usd;
            const change = data.usd_24h_change; // number
            const direction = change >= 0 ? "📈 UP" : "📉 DOWN";
            return `[${coinId.toUpperCase()} LIVE DATA]: Price: $${price.toLocaleString()} USD | 24h Change: ${change.toFixed(2)}% ${direction}`;
        }
    } catch (error) {
        console.warn(`Failed to fetch price for ${coinId}:`, error);
    }
    return "";
}

async function gatherContext(query: string): Promise<string> {
    const q = query.toLowerCase();
    let context = "";

    // 1. Live Crypto Prices (Real-time from CoinGecko)
    if (q.includes('bitcoin') || q.includes('btc')) {
        const btcData = await fetchLiveCryptoPrice('bitcoin');
        if (btcData) context += `\n${btcData}`;
    }
    if (q.includes('ethereum') || q.includes('eth')) {
        const ethData = await fetchLiveCryptoPrice('ethereum');
        if (ethData) context += `\n${ethData}`;
    }

    // 2. Forex/Economic Events Context (From local calendar)
    if (q.includes('news') || q.includes('event') || q.includes('calendar') || q.includes('us dollar') || q.includes('gold') || q.includes('xau')) {
        // Simple search in our local static forex data for relevant upcoming events
        const upcomingDay = forexData.days.find(d => {
            // Find a day that has events related to USD or the specific query
            return d.events.some(e => e.currency === 'USD' || e.name.toLowerCase().includes(q));
        });

        if (upcomingDay) {
            const relevantEvents = upcomingDay.events
                .filter(e => e.currency === 'USD' || e.name.toLowerCase().includes(q))
                .slice(0, 5)
                .map(e => `- ${e.timeLabel}: ${e.name} (${e.currency}) [Impact: ${e.impactTitle}]`)
                .join('\n');

            if (relevantEvents) {
                context += `\n[UPCOMING RELEVANT EVENTS (${upcomingDay.date})]:\n${relevantEvents}`;
            }
        }
    }

    // 3. Gold Context (Static Fallback + Strategy)
    if (q.includes('gold') || q.includes('xau')) {
        context += `\n[GOLD (XAUUSD) STRATEGY CONTEXT]: 
         - Gold is highly sensitive to US economic data (CPI, NFP, Fed Rates).
         - Always check the DXY (Dollar Index) correlation.
         - Current Trend: Check H4/D1 market structure before signaling.`;
    }

    return context;
}


// Wrapper for the UI component to use
export async function chatWithRosieAI(messages: { role: string, content: string }[], existingSessionId?: string): Promise<{ text: string, sessionId: string }> {
    // We only send the *last* user message because the backend (via sessionId) handles history context.
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== 'user') {
        return { text: "Error: No user message found to send.", sessionId: existingSessionId || '' };
    }

    // Reuse session ID or create new one
    let sessionId = existingSessionId;
    let finalMessageToSend = lastMsg.content;

    // Gather dynamic context based on the user's query
    const dynamicContext = await gatherContext(lastMsg.content);
    if (dynamicContext) {
        finalMessageToSend = `${finalMessageToSend}\n\n[SYSTEM INJECTED CONTEXT]:${dynamicContext}`;
    }

    if (!sessionId) {
        sessionId = createSessionId('rosie-client');
        // Prepend system prompt to the very first message of the session to "prime" the AI
        finalMessageToSend = `${SYSTEM_PROMPT}\n\n[USER REQUEST]:\n${finalMessageToSend}`;
    }

    // 1. Get Chat Response (Main Thread)
    const responseText = await callChatAI(finalMessageToSend, sessionId);

    // 2. Store Interaction (Background Thread)
    // We do NOT await this, so the UI can update immediately.
    const interactionContent = `Human: ${lastMsg.content}\nAI: ${responseText}`;
    const timestamp = new Date().toISOString();
    storeTextToWorkspace(
        interactionContent,
        `Chat Log ${timestamp}`,
        { type: 'chat_history', user_query: lastMsg.content }
    ).then(res => {
        if (!res.success) console.warn("Background Storage Failed:", res.error);
    }).catch(err => console.error("Background Storage Exception:", err));

    return { text: responseText, sessionId };
}


// --- API 2 & 3: STORE & EMBED ---

export async function storeTextToWorkspace(textToStore: string, documentName: string, metadata = {}): Promise<StorageResult> {
    const workspaceSlug = TARGET_WORKSPACE;

    // Enforce "rosie-pham-" prefix
    const finalDocName = documentName.startsWith('rosie-pham-')
        ? documentName
        : `rosie-pham-${documentName}`;

    try {
        // 1. Upload
        console.log(`[AI Storage] Uploading "${finalDocName}" to ${workspaceSlug}...`);
        const uploadRes = await axios.post<UploadResponse>(`${BASE_URL}/api/v1/document/raw-text`, {
            textContent: textToStore,
            metadata: {
                title: finalDocName,
                source: 'rosie-website',
                target_workspace: workspaceSlug,
                ...metadata
            }
        }, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            validateStatus: (status) => status >= 200 && status < 500
        });

        if (uploadRes.data?.success === false) {
            return { success: false, workspace: workspaceSlug, step: 'upload', error: `Upload Failed: ${JSON.stringify(uploadRes.data)}` };
        }

        const location = uploadRes.data.documents?.[0]?.location;
        if (!location) {
            return { success: false, workspace: workspaceSlug, error: 'No location returned in upload response' };
        }

        // 2. Embed
        console.log(`[AI Storage] Embedding location: ${location}...`);
        const embedRes = await axios.post(`${BASE_URL}/api/v1/workspace/${workspaceSlug}/update-embeddings`, {
            adds: [location],
            deletes: []
        }, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            validateStatus: (status) => status >= 200 && status < 500
        });

        if (embedRes.status !== 200) {
            return { success: false, workspace: workspaceSlug, step: 'embed', error: `Embed Failed: ${JSON.stringify(embedRes.data)}` };
        }

        return { success: true, workspace: workspaceSlug, location: location };

    } catch (e: unknown) {
        console.error('[AI Storage] Error:', e);
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        return { success: false, workspace: workspaceSlug, error: errorMessage };
    }
}
