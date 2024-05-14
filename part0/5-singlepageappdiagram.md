# User Visiting SPA

```mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: GET /spa
    activate server
    server-->>browser: the HTML document
    deactivate server
    activate browser

    browser->>server: GET /main.css
    deactivate browser
    activate server
    server-->>browser: the CSS file
    deactivate server
    activate browser

    browser->>server: GET /spa.js
    deactivate browser
    activate server
    server-->>browser: the JS file
    deactivate server
    activate browser

    Note right of browser: client starts executing JS

    browser->>server: GET /data.json
    deactivate browser
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: client callback fn performs re-rendering of HTML
```
