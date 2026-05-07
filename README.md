<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 46 28 PM" src="https://github.com/user-attachments/assets/6cbfa8cd-97bb-45aa-b4ed-7df4be671166" />

Production-style personal portfolio with an integrated recruiter assistant named **Xeno AI Assistant**.

## Files

- `index.html` - main portfolio, resume snapshot, projects, contact, and Xeno widget markup
- `style.css` - portfolio UI, responsive layout, glassmorphism assistant styles
- `app.js` - portfolio interactions, project/certificate filters, Xeno chat logic, voice input/output
- `CV_Abhiram.pdf` - downloadable resume
- `xeno-assistant.html` - standalone and embedded Xeno assistant experience

<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 46 39 PM" src="https://github.com/user-attachments/assets/967ca17e-60f9-46e7-9c3d-e63d4250dfc8" />

# Abhiram Thallapally Portfolio
<img width="1434" height="696" alt="Screenshot 2026-05-07 at 6 41 15 PM" src="https://github.com/user-attachments/assets/434053fb-b704-4ac5-8d77-f733fb1daaf2" />

## Features

- Responsive dark portfolio UI
- Resume snapshot with skills, projects, education, and certifications
- Download Resume button
- Filterable project and certificate sections
- Floating **Xeno AI Assistant** button
- Pure HTML/CSS animated robot mascot that acts as the Xeno trigger
- Expandable glassmorphism chat panel
- Local resume-trained answers for recruiter questions
- Quick prompts:
  - Summarize my profile
  - Give interview pitch
  - Explain AI projects
- Speech-to-text microphone input using the Web Speech API
- Text-to-speech responses with female/male voice selection
- Chat history saved in `localStorage`
- Clear chat button
- Enter key to send
- API fallback: Xeno works locally when no API key is configured

## Robot Mascot Integration

<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 47 07 PM" src="https://github.com/user-attachments/assets/c93df568-11e9-4d9a-b908-08f6fd35619a" />

The Xeno robot is built with div/span-style HTML inside the `data-xeno-toggle` button in `index.html`.

Related files:

- Markup: `index.html`, inside the `xeno-launcher` button
- Styling and keyframes: `style.css`, under `XENO AI ASSISTANT`
- State logic: `app.js`, inside `initChat()`

Animation states:

- `is-open` - waves when the chat opens
- `is-reacting` - bounce/glow when the user sends a message or opens Xeno
- `is-thinking` - neon core pulse while Xeno prepares a response
- `is-talking` - animated mouth and waveform while speech output plays

No external images or libraries are used.

## Xeno AI Assistant Knowledge

Xeno answers from Abhiram's portfolio and resume content:

- Skills: Python, Java, JavaScript, SQL, AI/ML, full-stack development, data visualization, tools
- Projects: thyroid disease prediction, budgeting tool, portfolio, weather dashboard, GitHub analyzer, financial calculator, ML demos, JavaScript demos
- Certifications: AWS Cloud Foundations, AWS Machine Learning Foundations, Full Stack Development, Cyber Security Audits
- Education: Computer Science, Artificial Intelligence and Machine Learning, 2025
- Contact: email, phone, GitHub, LinkedIn
<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 47 07 PM" src="https://github.com/user-attachments/assets/784f5670-a257-43ec-877a-8f4b68014764" />
## Setup

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Optional API Integration

Xeno currently uses the built-in local knowledge base in `app.js`, so it works without a key.

For Typecast text-to-speech audio generation, use the Node helper:

```bash
TYPECAST_API_KEY=your_key node scripts/typecast-tts.mjs
```

This writes `typecast.wav` locally. Keep `TYPECAST_API_KEY` server-side; do not place it in browser JavaScript.

To connect a hosted AI API, update `XENO_CONFIG` in `app.js`:

```js
const XENO_CONFIG = {
  apiKey: "YOUR_API_KEY",
  apiEndpoint: "https://your-api.example.com/xeno"
};
```

Expected API response:

```json
{
  "reply": "Assistant response text"
}
```

If the API key or endpoint is missing, or if the request fails, Xeno automatically falls back to local portfolio responses.

## Voice Notes

- Speech-to-text depends on browser support for `SpeechRecognition` or `webkitSpeechRecognition`.
- Text-to-speech depends on `speechSynthesis`.
- Female voice is selected by default.
- Users can switch between Female and Male voice in the assistant toolbar.
- If microphone permission is blocked or unsupported, typed chat continues to work.
<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 48 04 PM" src="https://github.com/user-attachments/assets/775c19bb-9d7f-44ed-9e9d-f1daffb321b6" />
<img width="1423" height="803" alt="Screenshot 2026-04-01 at 11 47 43 PM" src="https://github.com/user-attachments/assets/39a70d91-7858-4d5f-a99c-cd1821f253ca" />

