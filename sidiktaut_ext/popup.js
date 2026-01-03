async function checkServer(silent = false) {
  if (!navigator.onLine) {
    updateBadgeOffline();
    return;
  }

  if (!silent) {
    ui.status.textContent = "CHECKING...";
    ui.status.className = "badge";
  }

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    await fetch("http://127.0.0.1:5000/scan", {
      method: "OPTIONS",
      signal: controller.signal
    });

    ui.status.textContent = "ONLINE";
    ui.status.className = "badge online";

  } catch (e) {
    ui.status.textContent = "OFFLINE";
    ui.status.className = "badge offline";
    ui.status.title = "Pastikan 'python app.py' berjalan";
  }
}
