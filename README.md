# Speak21: the free 21-day English challenge

Speak21 asks for 30 minutes a day: **10 min reading · 10 min writing · 10 min speaking**, for 21 days.
For the speaking task, you record yourself, then review the recording 4 ways: sound off, sound only, full video, then reflect.
On Day 21 you watch your Day 1 and Day 21 videos side by side.

- App: [`app/`](app/). It's a plain HTML/CSS/JS installable web app (PWA) with no build step.
- Research and roadmap: [`docs/PLAN.md`](docs/PLAN.md)

## Run it locally
```bash
cd app
python3 -m http.server 8000
# open http://localhost:8000
```
The camera and microphone need `localhost` or HTTPS.

## Put it online for free (GitHub Pages)
1. Go to repo **Settings → Pages**.
2. Under **Source**, choose *Deploy from a branch*, pick the branch, and set the folder to `/ (root)`.
3. Open `https://<username>.github.io/<repo>/app/` on your phone, then use **Share → Add to Home Screen**.

## Privacy
Profiles, progress, writing and videos are stored only on the user's device. There's no server.
