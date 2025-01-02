// main.js
async function translate(text, from, to, options) {
    const { config, detect, setResult, utils } = options;
    const { http } = utils;
    const { fetch } = http;

    let { apiKey, apiUrl } = config;

    if (!apiUrl || apiUrl.length === 0) {
        throw 'API URL is not configured.';
    }

    if (!apiKey || apiKey.length === 0) {
        throw 'API Key is not configured.';
    }

    if (!apiUrl.startsWith("http")) {
        apiUrl = `https://${apiUrl}`;
    }

    const payload = {
        text,
        source_language: from,
        target_language: to
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(`${apiUrl}/translate`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.data;
            if (result.translation) {
                return result.translation;
            } else {
                throw `Translation failed: ${JSON.stringify(result)}`;
            }
        } else {
            throw `Http Request Error\nHttp Status: ${response.status}\n${JSON.stringify(response.data)}`;
        }
    } catch (error) {
        throw `Error during translation: ${error}`;
    }
}
