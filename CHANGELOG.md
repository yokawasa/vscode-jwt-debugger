# Change Log

All notable changes to the "jwt-debugger" extension will be documented in this file.

## 0.5.0

- New feature: Input terminal for decode JWT that allow users insert their token into input terminal, and decode by @seon22break in [#9](https://github.com/yokawasa/vscode-jwt-debugger/pull/9)

## 0.4.2

- Fix security vulnerability: upgrade jargs-parser to 13.1.2
- Fix security vulnerability: upgrade minimist to 1.2.5

## 0.4.1

- Fix CSP: only allow the minimal amount of content that our extension needs to function

## 0.4.0

- Add [Content-Security-Policy](https://code.visualstudio.com/api/extension-guides/webview#content-security-policy)

## 0.3.0

- Disable a command shortcut key (`Ctrl+shift+d` or `Cmd+shift+d` for Mac) when editor has no text selection

## 0.2.0

- Add a new keybind to execute the command `JWT Debugger Decocde`. Now  you can execute the command either in `Command Palette` or with keybind `Ctrl+Shift+d` (Mac: `Cmd+Shift+d`)

## 0.1.0

- Initial release (alpha release)
