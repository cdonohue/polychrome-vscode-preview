import Head from "next/head";
import ColorInput from "../components/ColorInput";
import CodeWindow from "../components/CodeWindow";
import Overlay from "../components/Overlay";
import PresetSelect from "../components/PresetSelect";
import generateTheme from "../utils/generateTheme";
import queryString from "query-string";
import color from "polychrome";

const presets = [
  {
    primary: "#a59ccc",
    accent: "#ffe685",
    background: "#2a2833",
    name: "Dark"
  },
  {
    primary: "#7272a1",
    accent: "#fe7734",
    background: "#24242e",
    name: "Space"
  },
  {
    primary: "#869886",
    accent: "#e7f98b",
    background: "#232523",
    name: "Forest"
  },
  {
    primary: "#98755d",
    accent: "#fecb52",
    background: "#2c2826",
    name: "Earth"
  },
  {
    primary: "#ae91e8",
    accent: "#fec38f",
    background: "#2c2734",
    name: "Sky"
  },
  {
    primary: "#5d8cc0",
    accent: "#34febb",
    background: "#1d262f",
    name: "Sea"
  },
  {
    primary: "#ffffff",
    accent: "#ffdc00",
    background: "#222222",
    name: "Bee"
  },
  {
    primary: "#9191a1",
    accent: "#a1bfce",
    background: "#272732",
    name: "Gray"
  },
  {
    primary: "#929292",
    accent: "#ffffff",
    background: "#222222",
    name: "Mono"
  },
  {
    primary: "#6B3DF1",
    accent: "#A97E50",
    background: "#FBFAF9",
    name: "Light"
  },
  {
    primary: "#6ba1f4",
    accent: "#d37e7e",
    background: "#FFFFFF",
    name: "Snow"
  },
  {
    primary: "#999999",
    accent: "#000000",
    background: "#FFFFFF",
    name: "Apex"
  }
];

export default class App extends React.Component {
  state = {
    primary: "#a59ccc",
    accent: "#ffe685",
    background: "#2a2833",
    inputPrimary: "#a59ccc",
    inputAccent: "#ffe685",
    inputBackground: "#2a2833",
    copiedSnippet: false,
    copiedLink: false,
    copiedInputSnippet: false,
    showOverlay: false,
    selectedPreset: {
      primary: "#a59ccc",
      accent: "#ffe685",
      background: "#2a2833",
      name: "Dark"
    }
  };

  componentDidMount() {
    const params = window.location.search;

    const { primary, accent, background } = queryString.parse(params);

    this.setState(
      {
        primary: primary ? `#${primary}` : this.state.primary,
        accent: accent ? `#${accent}` : this.state.accent,
        background: background ? `#${background}` : this.state.background,
        inputPrimary: primary ? `#${primary}` : this.state.primary,
        inputAccent: accent ? `#${accent}` : this.state.accent,
        inputBackground: background ? `#${background}` : this.state.background
      },
      this.updateUrl
    );
  }

  updateUrl = () => {
    window.history.pushState(
      "",
      "",
      `?primary=${this.state.primary.replace(
        "#",
        ""
      )}&accent=${this.state.accent.replace(
        "#",
        ""
      )}&background=${this.state.background.replace("#", "")}`
    );
    this.setState({ currentUrl: window.location.href });
  };

  colorDidChange = (label, hex) => {
    this.setState({
      [`input${label}`]: hex
    });

    try {
      color(hex);
      this.setState(
        {
          [label.toLowerCase()]: hex
        },
        this.updateUrl
      );
    } catch (err) {
      console.error(err);
      return;
    }
  };

  handlePresetChange = preset => {
    const { accent, background, primary } = preset;

    this.setState({
      primary,
      accent,
      background,
      inputPrimary: primary,
      inputAccent: accent,
      inputBackground: background,
    }, this.updateUrl)
  };

  handleCopySnippet = e => {
    window.getSelection().removeAllRanges();
    const snippetElement = document.querySelector(".snippet pre");
    const range = document.createRange();
    range.selectNode(snippetElement);
    window.getSelection().addRange(range);
    try {
      // Now that we've selected the anchor text, execute the copy command
      document.execCommand("copy");
      this.setState({
        copiedSnippet: true,
        showOverlay: true
      });
      setTimeout(() => {
        this.setState({ copiedSnippet: false });
      }, 4000);
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    window.getSelection().removeAllRanges();
  };

  handleCloseOverlay = e => {
    this.setState({
      showOverlay: false
    });
  };

  handleCopyLink = e => {
    window.getSelection().removeAllRanges();
    const snippetElement = document.querySelector(".current-url small");
    const range = document.createRange();
    range.selectNode(snippetElement);
    window.getSelection().addRange(range);
    try {
      // Now that we've selected the anchor text, execute the copy command
      document.execCommand("copy");
      this.setState({ copiedLink: true });
      setTimeout(() => {
        this.setState({ copiedLink: false });
      }, 4000);
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    window.getSelection().removeAllRanges();
  };

  render() {
    const {
      accent,
      background,
      primary,
      inputAccent,
      inputBackground,
      inputPrimary
    } = this.state;
    const isDark = color(background).isDark();
    const theme = generateTheme(accent, primary, background);

    return (
      <div className="page">
        <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.1/dist/react-select.css" />
        <Head>
          <title>🎨 Polychrome theme viewer</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="header">
          <div className="hero">
            <h1>Polychrome themes</h1>
            <p>
              This utility makes it easy to preview editor themes generated with <a href="https://marketplace.visualstudio.com/items?itemName=cdonohue.polychrome-vscode-themes">Polychrome themes</a> for VS Code.
            </p>
            <p>
              Simply install the theme extension to VS Code using the link above. Then, modify the colors below to generate your favorite duotone theme. Once you are satisfied, simply copy the generated snippet and paste it into your VS Code user settings file.
            </p>
            <p>
              The url on this page will update as you make selections. Share your favorites with your friends!
            </p>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <div className="presets">
              <PresetSelect
                items={presets}
                selectedItem={this.state.selectedPreset}
                onChange={this.handlePresetChange}
              />
            </div>
            <div className="inputs">
              <ColorInput
                label="Primary"
                onChange={this.colorDidChange}
                selectedColor={inputPrimary}
              />
              <ColorInput
                label="Accent"
                onChange={this.colorDidChange}
                selectedColor={inputAccent}
              />
              <ColorInput
                label="Background"
                onChange={this.colorDidChange}
                selectedColor={inputBackground}
              />
              <div className="color-swatch">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
              <button
                className="btn-input copy-snippet"
                onClick={this.handleCopySnippet}
              >
                {this.state.copiedSnippet && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>&nbsp;Copied!
                  </div>
                )}
                {!this.state.copiedSnippet && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-code"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>&nbsp;Copy Snippet
                  </div>
                )}
              </button>
              <Overlay isOpen={this.state.showOverlay}>
                <h3>Sweet!</h3>
                <p>
                  🖥 Open VS Code <br />
                  🔎 Navigate to User Settings{" "}
                  <code className="inline">Cmd/Ctrl + ,</code> <br />
                  📋 Paste your new theme config
                </p>
                <button
                  className="btn-input btn-input-modal copy-snippet"
                  onClick={this.handleCloseOverlay}
                >
                  <div>Got It</div>
                </button>
              </Overlay>
              <button
                className="btn-input copy-link"
                onClick={this.handleCopyLink}
              >
                {this.state.copiedLink && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>&nbsp;Copied!
                  </div>
                )}
                {!this.state.copiedLink && (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-link"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>&nbsp;Copy Link
                  </div>
                )}
              </button>
              <div className="current-url">
                <small>{this.state.currentUrl}</small>
              </div>
            </div>
            <div className="snippet">
              <pre>
                "polychrome.{isDark ? "dark" : "light"}.primary": "{primary}",<br />
                "polychrome.{isDark ? "dark" : "light"}.accent": "{accent}",<br />
                "polychrome.{isDark ? "dark" : "light"}.background": "{
                  background
                }",
              </pre>
            </div>
            <div className="preview">
              <CodeWindow theme={theme} />
            </div>
          </div>
        </div>
        <style jsx>{`
            .page {
              --codeFontSize: 9px;
              --baseFontSize: 12px;
              --headerFontSize: 16px;
              --spacer: 16px;
              --swiftEasing: cubic-bezier(.25,.8,.25,1);
              --hoverBoxShadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
              --uiBg: ${theme.uiBg};
              --editorBackground: ${theme.editorBg};
              --editorBackgroundContrast: ${color(theme.editorBg)
            .contrast()
            .hex()};
              --bgContrastTransparent: ${color(theme.uiBg)
            .contrast()
            .setAlpha(26)
            .rgb()};
            }

            .header {
              background: ${this.state.primary};
              color: ${color(this.state.primary)
            .contrast()
            .hex()};
              border-bottom: 1px solid rgba(0,0,0,.12);
              box-shadow: 0 4px 2px rgba(0,0,0,.12);
            }

            .header a {
              background: ${color(this.state.primary)
            .contrast()
            .hex()};
              color: ${this.state.primary};
              display: inline-block;
              margin: 2px;
              padding: 4px 6px;
              text-decoration: none;
              border-radius: 2px;
            }
            
            .header a {
              background: ${color(this.state.primary)
            .contrast()
            .hex()};
              color: ${color(this.state.primary)
            .contrast()
            .contrast()
            .hex()};
              display: inline-block;
              margin: 2px;
              padding: 4px 6px;
              text-decoration: none;
              border-radius: 2px;
              transition: .2s var(--swiftEasing);
              box-shadow: 0 2px 4px rgba(0,0,0,.12);
            }

            .header a:hover {
              box-shadow: 0 4px 12px rgba(0,0,0,.12);
            }

            .hero,
            .content {
              max-width: 960px;
              margin: 0 auto;
              padding: var(--spacer);
            }


         
            .container {
              display: grid;
              grid-gap: var(--spacer);
              grid-template-areas:
                "presets"
                "preview"
                "inputs"
                "snippet"
              ;
          }

          h1 {
            font-weight: 500;
          }

          h3 {
            font-weight: 200;
            font-size: var(--headerFontSize);
            text-align: center;
            margin: 0;
            display: grid;
            grid-gap: var(--spacer);
            align-items: center;
            grid-template-columns: 1fr auto 1fr;
          }

          h3:before,
          h3:after {
            content: "";
            display: inline-block;
            background: ${color(this.state.background)
            .contrast()
            .setAlpha(12)
            .rgb()}
            height: 1px;
          }

          p {
            font-weight: 200;
          }

          code.inline {
            background: ${color(this.state.background)
            .contrast()
            .hex()};
            padding: 6px 6px 4px 6px;
            border-radius: 2px;
            font-size: 1rem;
            font-weight: 400;
            margin-top: -2px;
            color: ${this.state.background};
          }

          ol {
            margin: 0;
          }

          .current-url {
            font-size: var(--codeFontSize);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: .5;
            padding: 0;
          }

          .presets {
            grid-area: presets;
          }

          .preset-button {
            height: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            border-radius: 5px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 10px;
            padding: 8px;
            position: relative;
            background: var(--background);
            border: 1px solid ${color(theme.uiBg)
            .contrast()
            .setAlpha(22)
            .rgb()};
            transition: .3s var(--swiftEasing);
          }

          .preset-button.light {
            color: black;
          }

          .preset-button:hover {
            cursor: pointer;
            box-shadow: var(--hoverBoxShadow);
          }

          .preset-button:before,
          .preset-button:after {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 16px;
            display: inline-block;
            position: absolute;
            right: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .12);
          }

          .preset-button:before {
            background: var(--primary);
            z-index: 1;
            top: 8px;
          }

          .preset-button:after {
            background: var(--accent);
            z-index: 0;
            bottom: 8px;
          }

          .inputs {
            grid-area: inputs;
          }

          .color-swatch {
            display: flex;
            overflow: hidden;
            width: auto;
            margin: var(--spacer) 0;
          }

          .color-swatch > div {
            flex: 1 1 auto;
            height: 8px;
            background: white;
          }

          .color-swatch > div:nth-child(1) {
            background: ${theme.primary1};
            border-radius: 8px 0 0 8px;
          }

          .color-swatch > div:nth-child(2) {
            background: ${theme.primary2};
          }

          .color-swatch > div:nth-child(3) {
            background: ${theme.primary3};
          }

          .color-swatch > div:nth-child(4) {
            background: ${theme.primary4};
          }

          .color-swatch > div:nth-child(5) {
            background: ${theme.primary5};
          }

          .color-swatch > div:nth-child(6) {
            background: ${theme.accent1};
          }

          .color-swatch > div:nth-child(7) {
            background: ${theme.accent2};
          }

          .color-swatch > div:nth-child(8) {
            background: ${theme.accent3};
            border-radius: 0 8px 8px 0;
          }

          .btn-input div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .btn-input-modal div {
            justify-content: center;
          }

          .btn-input {
            background: ${theme.editorBg};
            color: ${color(theme.uiBg)
            .contrast()
            .hex()};
            border: 1px solid ${this.state.accent};
            border-radius: 4px;
            width: 100%;
            font-size: var(--baseFontSize);
            padding: calc(var(--spacer) / 2);
            box-shadow: 0 3px 4px rgba(0, 0, 0, .12);
            transition: .2s var(--swiftEasing);
            outline: none;
            margin: calc(var(--spacer) / 2) 0;
          }

          .btn-input.copy-snippet {
            border: none;
            background: ${this.state.accent};
            color: ${color(this.state.accent)
            .contrast()
            .hex()};
            animation: pulse 4s infinite;
            box-shadow: 0 3px 4px rgba(0, 0, 0, .12)
          }

          .btn-input.copy-link:hover {
            cursor: pointer;
            box-shadow: var(--hoverBoxShadow);
          }

          .btn-input:active {
            background: ${color(theme.uiBg)
            .lighten()
            .hex()};
          }

          .btn-input.copy-snippet:hover {
            cursor: pointer;
            background: ${color(this.state.accent)
            .saturate()
            .lighten()
            .hex()};
          }

          .btn-input.copy-snippet:active {
            background: ${color(this.state.accent)
            .saturate()
            .darken()
            .hex()};
          }

          .snippet {
            grid-area: snippet;
            border-radius: 4px;
            border: none;
            background: ${color(this.state.accent)
            .setAlpha(6)
            .rgb()};
            font-size: var(--codeFontSize);
            padding: calc(var(--spacer) / 2);
            white-space: inherit;
            display: flex;
          }

          .snippet pre {
            flex: 1 1 auto;
            margin: 0;
          }

          .btn-copy-snippet {
            background: ${this.state.accent};
            color: ${color(this.state.accent)
            .contrast()
            .hex()};
            border: none;
            border-radius: 4px;
            font-size: var(--baseFontSize);
            padding: 0 var(--spacer);
            box-shadow: 0 3px 4px rgba(0, 0, 0, .12);
            transition: .2s var(--swiftEasing);
            animation: pulse 4s infinite;
            width: 30%;
            max-width: 120px;
            outline: none;
          }

          .btn-copy-snippet div {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .btn-copy-snippet:hover {
            cursor: pointer;
            background: ${color(this.state.accent)
            .saturate()
            .lighten()
            .hex()};
          }

          @keyframes pulse {
            60% {
              box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 0 0 ${color(
            this.state.accent
          )
            .setAlpha(50)
            .rgb()};
            }
            100% {
              box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 100px 12px ${color(
            this.state.accent
          )
            .setAlpha(1)
            .rgb()};
            }
          }

          .preview {
            grid-area: preview;
          }

          @media(min-width: 570px) {
            .page {
              --headerFontSize: 32px;
              --baseFontSize: 16px;
              --codeFontSize: 12px;
            }
          }

          @media(min-width: 890px) {
            .container {
              grid-gap: var(--spacer);
              grid-template-columns: 200px 1fr;
              grid-template-areas:
                "presets preview"
                "inputs preview"
                "snippet snippet"
              ;
            }
          }

          @media(min-width: 1016px) {
            .page {
              --codeFontSize: 16px;
              --spacer: 32px;
            }
          }

          @keyframes dropIn {
            from {
              opacity: 0;
              transform: translateY(-64px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          `}</style>
        <style jsx global>{`
          html {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol";
            font-weight: 400;
            font-size: 10px;
            transition: 0.2s var(--swiftEasing);
            background: ${theme.editorBg};
            color: ${color(theme.editorBg)
            .contrast()
            .hex()};
            text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
          }

          *,
            *: before,
            *: after {
            box-sizing: inherit;
          }

          body {
            margin: 0;
            font-size: 1.6rem;
          }
        `}</style>
      </div>
    );
  }
}
