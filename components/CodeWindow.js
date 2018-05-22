const createMarkup = (background, primary1, primary2, primary3, primary5, accent1, accent2, lineHighlight) => ({
  __html: `
  <pre class="preview">
  <style>
  pre.preview {
    padding: calc(var(--spacer) / 4);
    margin: 0;
    overflow: auto;
    text-overflow: ellipsis;
    background: ${background};
    color: ${primary2};
    overflow: auto;
    counter-reset: line;
    text-shadow: none;
    white-space: pre-wrap;
}
pre.preview code {
  margin: 0; 
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: 1.5;
  letter-spacing: -.5px;
  font-size: var(--codeFontSize);
  counter-increment: line;
  display: inline-block;
  position: relative;
  z-index: 2;
}

pre.preview code:before {
  padding: 0;
  margin-right: var(--spacer);
  text-align: right;
  width: var(--spacer);
  display: inline-block;
  content: counter(line);
  color: ${primary5};
}

.primary1 {
  color: ${primary1};
}

.primary2 {
  color: ${primary2};
}

.primary3 {
  color: ${primary3};
}

.primary5 {
  color: ${primary5};
}

.accent1 {
  color: ${accent1};
}

.accent2 {
  color: ${accent2};
}

.i {
  font-style: italic;
}

.u {
  text-decoration: underline;
}
  </style>
  <code><span class="accent2">import</span> <span class="primary3">React</span><span class="primary5">, {</span> <span class="primary3">Component</span> <span class="primary5">}</span> <span class="accent2">from</span> <span class="primary5">'</span><span class="accent1">react</span><span class="primary5">';</span></code>
  <code><span class="accent2">import</span> <span class="primary3">logo</span> <span class="accent2">from</span> <span class="primary5">'</span><span class="accent1">./logo.svg</span><span class="primary5">';</span></code>
  <code><span class="accent2">import</span> <span class="primary5">'</span><span class="accent1">./App.css</span><span class="primary5"><span class="primary5">';</span></span></code>
  <code></code>
  <code><span class="accent1 i">class</span> <span class="primary1">App</span> <span class="accent2">extends<span> <span class="primary1 i u">Component</span> <span class="primary5">{</span></code>
  <code>  <span class="primary1">render</span><span class="primary5">() {</span></code>
  <code>    <span class="accent2">return</span> <span class="primary5">(</span></code>
  <code class="currentLine">      <span class="primary5">&lt;</span><span class="primary1">div</span> className<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">App</span><span class="primary5">"</span><span class="primary5">&gt;</code>
  <code>        <span class="primary5">&lt;</span><span class="primary1">header</span> className<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">App-header</span><span class="primary5">"</span><span class="primary5">&gt;</code>
  <code>          <span class="primary5">&lt;</span><span class="primary1">img</span> src<span class="accent2">=</span><span class="primary5">{</span><span class="primary3">logo</span><span class="primary5">}</span> className<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">App-logo</span><span class="primary5">"</span> alt<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">logo</span><span class="primary5">"</span> <span class="primary5">/&gt;</span></code>
  <code>          <span class="primary5">&lt;</span><span class="primary1">h1</span> className<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">App-title</span><span class="primary5">"</span><span class="primary5">&gt;</span>Welcome to React<span class="primary5">&lt;/</span><span class="primary1">h1</span><span class="primary5">&gt;</span></code>
  <code>        <span class="primary5">&lt;/</span><span class="primary1">header</span><span class="primary5">&gt;</span></code>
  <code>        <span class="primary5">&lt;</span><span class="primary1">p</span> className<span class="accent2">=</span><span class="primary5">"</span><span class="accent1">App-intro</span><span class="primary5">"</span><span class="primary5">&gt;</span></code>
  <code>          To get started, edit <span class="primary5">&lt;</span><span class="primary1">code</span><span class="primary5">&gt;</span>src/App.js<span class="primary5">&lt;/</span><span class="primary1">code</span><span class="primary5">&gt;</span></code>
  <code>        <span class="primary5">&lt;/</span><span class="primary1">p</span><span class="primary5">&gt;</span></code>
  <code>      <span class="primary5">&lt;/</span><span class="primary1">div</span><span class="primary5">&gt;</span></code>
  <code>    <span class="primary5">);</span></code>
  <code>  <span class="primary5">}</span></code>
  <code><span class="primary5">}</span></code>
  <code></code>
  <code><span class="accent2">export default</span> <span class="primary3">App</span><span class="primary5">;</span></code>
  </pre>
`})

export default ({ theme }) => {
  const { contrast, primary1, primary2, primary3, primary5, accent1, accent2, editorBg, sideBarBg, activityBarBg, uiBg, uiBorder, lineHighlight, mutedText } = theme;
  return (
    <div className="window">
      <div className="title-bar"></div>
      <div className="side-bar">
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name selected"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
        <div className="file-name"></div>
      </div>
      <div className="editor-group">
        <div className="tab-bar">
          <div className="tab active"></div>
          <div className="tab"></div>
          <div className="tab"></div>
          <div className="tab"></div>
        </div>
        <div className="editor" dangerouslySetInnerHTML={createMarkup(editorBg, primary1, primary2, primary3, primary5, accent1, accent2, lineHighlight)} />
      </div>
      <div className="status-bar"></div>
      <style jsx>{`
        .window {
          display: grid;
          background: ${uiBg};
          grid-template-columns: 1fr;
          grid-template-rows: 16px 1fr 16px;
          grid-template-areas:
            "titleBar"
            "editorGroup"
            "statusBar"
          ;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid ${uiBorder};
          box-shadow: var(--hoverBoxShadow);
        }

        .title-bar {
          grid-area: titleBar;
          background: ${activityBarBg};
        }
        .side-bar {
          grid-area: sideBar;
          background: ${sideBarBg};
          border-right: 1px solid ${uiBorder};
          display: none;
        }

        .file-name {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 8px;
        }

        .file-name.selected {
          background: ${editorBg};
        }

        .editor-group {
          grid-area: editorGroup;
          
        }
        .status-bar {
          grid-area: statusBar;
          background: ${activityBarBg};
        }

        .tab-bar {
          height: 24px;
          display: flex;
          overflow: hidden;
        }

        .tab {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 8px;
          border-right: 1px solid ${uiBorder};
        }

        .tab:before,
        .file-name:before {
          content: "";
          height: 3px;
          width: 50%;
          background: ${mutedText};
          border-radius: 2px;
          display: inline-block;
        }

        .file-name:nth-child(2n):before {
          width: 90%;
        }

        .file-name:nth-child(3n + 1):before {
          width: 72%;
        }

        .tab.active:before,
        .file-name.selected:before {
          background: ${contrast};
        }

        .tab.active {
          background: ${editorBg};
        }

        @media(min-width: 535px) {
          .window {
            grid-template-columns: 1fr 5fr;
            grid-template-areas:
              "titleBar titleBar"
              "sideBar editorGroup"
              "statusBar statusBar"
            ;
          }

          .side-bar {
            display: flex;
            padding-top: calc(var(--spacer) * 2);
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

// )