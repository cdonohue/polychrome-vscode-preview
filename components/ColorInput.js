import color from "polychrome"
import getColorName from "../utils/getColorName"

export default (props) => {
  function onColorChange(e) {
    props.onChange(props.label, e.target.value);
  }

  return (
    <div className="wrapper">
      <label>{props.label}</label>
      <div className="input">
        <div className="textInput">
          <input onChange={onColorChange} type="text" value={props.selectedColor} />
        </div>
        <div className="colorInput">
          <input onChange={onColorChange} type="color" value={props.selectedColor} />
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
          padding: 4px;
        }

        .textInput > input {
          outline: none;
          width: 100%;
          font-size: var(--baseFontSize);
          line-height: 2;
          padding: 0 4px;
          background: transparent;
          border: none;
          font-family: monospace;
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

        .colorInput > input {
          width: 80px;
          height: 80px;
          position: absolute;
          top: -16px;
          left: -16px;
        }

        .colorInput > input:hover {
          cursor: pointer;
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