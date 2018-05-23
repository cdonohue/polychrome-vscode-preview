import Downshift from "downshift";
import color from "polychrome";

const PresetItem = ({
  primary,
  accent,
  background,
  name
}) => (
    <div className="wrapper">
      {name}
      <label>{color(background).isDark() ? "Dark" : "Light"}</label>
      <style jsx>{`
      .wrapper {
        cursor: pointer;
        display: block;
        border: none;
        text-align: left;
        color: ${color(background)
          .contrast()
          .hex()};
        background: white;
        height: 24px;
        background: ${background};
        display: flex;
        font-weight: 200;
        font-size: 12px;
        align-items: center;
        justify-content: flex-start;
        padding: 8px 32px;
        position: relative;
        transition: 0.3s var(--swiftEasing);
        border: 2px solid transparent;
      }

      .wrapper:before,
      .wrapper:after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 8px;
        display: inline-block;
        position: absolute;
        left: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }

      .wrapper:hover {
        border-color: ${primary};
      }

      .wrapper:before {
        background: ${primary};
        z-index: 1;
        top: 10px;
      }

      .wrapper:after {
        background: ${accent};
        z-index: 0;
        bottom: 10px;
      }
      label {
        position: absolute;
        right: 8px;
        opacity: 0.3;
      }
     
    `}</style>
    </div>
  );

const DropdownButton = props => {
  return (
    <button className="btn" {...props}>
      {props.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        stroke-linecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-down"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      <style jsx>{`
        .btn {
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 4px;
          border: 1px solid var(--bgContrastTransparent);
          text-align: left;
          height: 44px;
          width: 100%;
          color: var(--bgContrast);
          background: var(--editorBackground);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: var(--baseFontSize);
          padding: 0 32px 0 12px;
          border-radius: 4px;
          position: relative;
          transition: 0.3s var(--swiftEasing);
        }

        svg {
          position: absolute;
          left: 8px;
          opacity: .5;
        }

        svg.feather-chevron-down {
          left: auto;
          right: 8px;
        }

        svg.feather-sliders {
          left: 8px;
        }
      `}</style>
    </button>
  );
};

export default ({ items, selectedItem, onChange }) => {
  return (
    <Downshift
      itemToString={item => JSON.stringify(item)}
      selectedItem={selectedItem}
      onChange={onChange}
      render={({
        isOpen,
        getToggleButtonProps,
        getItemProps,
      }) => (
          <div>
            <DropdownButton {...getToggleButtonProps()} {...selectedItem}>
              Try a preset
          </DropdownButton>
            <div className="dropdown-wrapper"
              style={{
                position: "relative"
              }}
            >
              {isOpen ? (
                <div className="dropdown-list"
                  style={{
                    borderRadius: "3px",
                    background: "transparent",
                    maxHeight: "250px",
                    width: "100%",
                    overflowY: "auto",
                    position: "absolute",
                    left: "0",
                    top: "4px",
                    zIndex: "3",
                    boxShadow: "var(--hoverBoxShadow)",
                    animation: "dropIn 0.3s"
                  }}
                >
                  {items
                    .map((item, index) => (
                      <div
                        {...getItemProps({
                          item,
                          key: index,
                        })}
                      >
                        <PresetItem {...item} />
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
    />
  );
};
