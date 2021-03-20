function Vis(props){
    return <div className="message-row" key={props.keyval} style={{height: props.heightval}}>
        <h2>{props.name}</h2>
        {props.filename.split('.').pop() === 'html' ? <iframe src={props.src}></iframe>: <img src={props.src}></img>}
    </div>
  }

export default Vis;