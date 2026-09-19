import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';

function solarAdvisorPlugin(): Plugin {
  return {
    name: 'solar-advisor-api',
    configureServer(server) {
      server.middlewares.use('/api/solar-advisor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(bodyStr || '{}');
            const { rooms, appliances, dailyUsage, backupNeed, notes } = data;

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.statusCode = 200;
              res.end(JSON.stringify({
                isAiGenerated: false,
                message: 'No API key configured. Providing standard Hybrid Solar engineering estimate.',
              }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const prompt = `A potential customer in Nigeria wants a solar system assessment.
Details provided:
- Number of rooms: ${rooms || 'Not specified'}
- Major appliances selected: ${Array.isArray(appliances) ? appliances.join(', ') : appliances || 'Standard household items'}
- Approximate daily usage requirement: ${dailyUsage || 'Daytime and evening'}
- Backup power requirement: ${backupNeed || 'Yes, reliable grid backup'}
${notes ? `- Additional notes: ${notes}` : ''}

Provide a general, non-binding recommendation for Hybrid Solar in Nigeria.
Strict instruction: Do not invent certifications or pretend this is an electrical engineering assessment. Include clear advice on recommended inverter rating (e.g. 2.5kVA, 3.5kVA, 5kVA, 7.5kVA, 10kVA or 15kVA+), estimated battery storage kWh (Lithium LiFePO4), solar panel wattage, and practical load management tips for Nigerian grid conditions.

Return a JSON object with this exact shape:
{
  "systemTier": string (e.g. "5.0kVA Hybrid Residential Solar System"),
  "inverterRating": string (e.g. "5.0 kVA / 48V Pure Sine Wave Inverter"),
  "batteryCapacity": string (e.g. "5.12 kWh - 10.24 kWh LiFePO4 Lithium Battery"),
  "solarPanels": string (e.g. "6 - 8 x 550W Tier-1 Mono PERC Solar Panels (3.3kW - 4.4kW Array)"),
  "recommendedAppliances": ["Refrigerator", "Lighting & Fans", "TV/Decoders/WiFi", "1x 1.0HP Inverter AC (daytime)"],
  "loadManagementTips": ["Run water pumping machine during peak sunshine hours", "Iron clothes in the afternoon while solar production is high"],
  "summary": string (concise 2-3 sentence overview explaining why this configuration suits their needs),
  "disclaimer": "This is a general estimate, not a professional electrical or engineering assessment. Contact Hybrid Solar for a proper system evaluation."
}`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: {
                systemInstruction: 'You are the Solar System Advisor for Hybrid Solar in Lagos, Nigeria. You provide realistic, professional, and practical non-binding solar guidance tailored to residential and commercial customers in Nigeria. Never make unsupported technical claims or invent awards.',
                responseMimeType: 'application/json',
              },
            });

            const text = response.text || '{}';
            const parsed = JSON.parse(text);
            res.statusCode = 200;
            res.end(JSON.stringify({ isAiGenerated: true, recommendation: parsed }));
          } catch (err: any) {
            console.error('Error generating solar recommendation:', err);
            res.statusCode = 200;
            res.end(JSON.stringify({
              isAiGenerated: false,
              error: err?.message || 'Failed to generate AI estimate',
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), solarAdvisorPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
