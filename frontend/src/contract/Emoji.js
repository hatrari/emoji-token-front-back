export function Emoji({icon}) {
  return (
    <div className="card">
      <div style={{fontSize: "100px", textAlign: "center"}} className="card-body">
        {icon}
      </div>
    </div>
  );
}