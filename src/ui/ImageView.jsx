function ImageView({ src, dimensions = "40px", additionalStyles = "" }) {
    return (
      <div
        style={{ width: dimensions, height: dimensions }}
        className={` ${additionalStyles} flex items-start justify-center overflow-hidden rounded-full`}
      >
        <img src={src} />
      </div>
    );
  }
  
  export default ImageView;
  