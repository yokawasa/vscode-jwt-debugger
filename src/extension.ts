import * as vscode from 'vscode';
import * as jwtDecode from "jwt-decode";

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('extension.jwtdebugger.decode', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      let selections: vscode.Selection[] = editor.selections;
      if (selections.length > 1) {
        vscode.window.showErrorMessage('[JWTDebugger] Sorry, multiple text is not supported!');
        return;
      }
      let selection: vscode.Selection = selections[0];
      let encoded_text:string = editor.document.getText(
          new vscode.Range(selection.start, selection.end
        ));
      if (encoded_text.length < 1) {
        vscode.window.showErrorMessage('Please select text!');
        return;
      }

      try {
        // jwtDocode return the result of JSON.parse() ( JSON.parse() return any )
        const decodedHeader = jwtDecode(encoded_text, { header: true });
        const decodedPayload = jwtDecode(encoded_text);
        const panel = vscode.window.createWebviewPanel(
              'previewJWTDecoded',
              'Preview JWT Decoded Result',
              vscode.ViewColumn.Two,
              {}
            );
        panel.webview.html = getWebviewContent(encoded_text, decodedHeader, decodedPayload);
      } catch (e){
        if (e.name === 'InvalidTokenError') {
          vscode.window.showErrorMessage('Invalid Token Error!');
        }
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

/**
 * Get Webview Content (HTML string)
 * @param token  - JWT Tokens string
 * @param header - decoded JWT header object (object return by JSON.parse())
 * @param payload  - decoded JWT payload object (object return by JSON.parse())
 * @returns HTML string
 */
function getWebviewContent(token: string, header: any, payload: any) {
  let h = JSON.stringify(header,null, 4);   // Algorithm and Token Type
  let p = JSON.stringify(payload, null, 4); // Data
  let elem: string[] = token.split(".",3);  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JWT Debugger - Decoded</title>
</head>
<body>
  <h1>Decoded</h1>
  <h2>Your Token</h2>
  <div class="encodedString" style="word-wrap: break-word;">
  <span style="color:#fb015b;font-weight:bold">${elem[0]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#d63aff;font-weight:bold">${elem[1]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#00b9f1;font-weight:bold">${elem[2]}</span>
  </div> 
  <h2>HEADER</h2>
  <pre style="color:#fb015b;font-weight: bold;">${h}</pre>
  <h2>PAYLOAD</h2>
  <pre style="color:#d63aff;font-weight: bold;">${p}</pre>
</body>
</html>`;
}

