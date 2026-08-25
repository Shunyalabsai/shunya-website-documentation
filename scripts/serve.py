#!/usr/bin/env python3
"""Serve the docs locally at http://localhost:8765/shunya-website-documentation/ (matches GitHub Pages paths)."""

import http.server
import os
import socketserver

PORT = 8765
BASE = "/shunya-website-documentation"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class DocsHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path == BASE or path.startswith(BASE + "/"):
            path = path[len(BASE) :] or "/"
        return super().translate_path(path)

    def log_message(self, format, *args):
        print(format % args)


if __name__ == "__main__":
    os.chdir(ROOT)
    with socketserver.TCPServer(("", PORT), DocsHandler) as httpd:
        print(f"Serving docs at http://localhost:{PORT}{BASE}/")
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()
