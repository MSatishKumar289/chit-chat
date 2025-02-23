function InputWrapper({
    inputLabel,
    children,
    error,
    labelInline = false,
    labelFont = "",
  }) {
    return (
      <section className={`w-9/12 ${labelInline ? "flex" : "block"}`}>
        <label className={`${labelFont}`}>{inputLabel}</label>
            {children}
            {/* {error && <p className="text-red-500">{error}</p>} */}
      </section>
    );
  }
  
  export default InputWrapper;
  