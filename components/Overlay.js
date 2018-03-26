export default (props) => (
  <div className="backdrop">
    <article>
      {props.children}
    </article>
    <div className="overlay" />
    <style jsx>{`
      .backdrop {
        color: white;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: ${props.isOpen ? "99998" : "-1"};;
        
      }
      .overlay {
        color: white;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        z-index: ${props.isOpen ? "99997" : "-1"};;
        opacity: ${props.isOpen ? ".85" : 0};
        transition: .3s var(--swiftEasing);
      }

      article {
        max-width: 320px;
        min-width: 320px;
        color: var(--editorBackgroundContrast);
        line-height: 1.8;
        border-radius: 4px;
        box-shadow: var(--hoverBoxShadow);
        margin: 0 auto;
        padding: var(--spacer);
        background: var(--editorBackground);
        transform: ${props.isOpen ? "translateY(0)" : "translateY(-20%)"};
        opacity: ${props.isOpen ? "1" : "0"};
        z-index: 99999;
        transition: .4s var(--swiftEasing);
      }
    `}</style>
  </div>
)