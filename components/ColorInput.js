import getColorName from "../utils/getColorName"
import DebounceInput from "react-debounce-input"

export default (props) => {
  const onColorChange = (e) => {
    props.onChange(props.label, e.target.value)
  }

  return (
    <div className="wrapper">
      <label>{props.label}</label>
      <div className="input">
        <div className="textInput">
          <DebounceInput
            debounceTimeout={100}
            style={{
              outline: "none",
              width: "100%",
              fontSize: "var(--baseFontSize)",
              lineHeight: "2",
              padding: "0 4px",
              background: "transparent",
              border: "none",
              fontFamily: "monospace",
            }}
            value={props.selectedColor}
            type="text"
            onChange={onColorChange}
          />
          {/* <input onChange={onColorChange} type="text" value={props.selectedColor} /> */}
        </div>
        <div className="colorInput">
          <DebounceInput
            debounceTimeout={100}
            className="inputControl"
            value={props.selectedColor}
            type="color"
            style={{
              width: "80px",
              cursor: "pointer",
              height: "80px",
              position: "absolute",
              top: "-16px",
              left: "-16px"
            }}
            onChange={onColorChange}
          />
          {/* <input onChange={onColorChange} type="color" value={props.selectedColor} /> */}
        </div>
      </div>
      <p>
        {getColorName(props.selectedColor)}
      </p>

      <style jsx>{`
        .wrapper {
          margin-bottom: calc(var(--spacer) / 2);
        }

        label {
          font-size: var(--baseFontSize);
          line-height: 2;
          display: inline-block;
        }

        .input {
          display: flex;
          align-items: center;
        }

        .textInput {
          flex: 1 1 auto;
          background: rgba(255,255,255,.85);
          border-radius: 3px;
          border: 1px solid var(--bgContrastTransparent);
          padding: 4px;
        }

        .colorInput {
          flex: 0 0 24px;
          border-radius: 44px;
          overflow: hidden;
          margin-left: 16px;
          width: 40px;
          height: 44px;
          padding: 0;
          border: 2px solid var(--bgContrastTransparent);
          position: relative;
          transition: .2s var(--swiftEasing);
        }

        .colorInput:hover {
          cursor: pointer;
          box-shadow: var(--hoverBoxShadow);
        }

        p {
          margin: 0;
          font-size: 1rem;
          font-weight: 200;
          padding: 3px 0;
          opacity: .5;
        }
      `}</style>
    </div>
  )
}