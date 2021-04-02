import React, { useState, useEffect } from "react";
import { API_TOKENS, API_ICONS } from "../Const";
import { Emoji } from "./Emoji";

export function ListTokens({account}) {
  const [tokens, setTokens] = useState([]);

  const init = async () => {
    const url = API_TOKENS.concat(`address/${account}`);
    const res = await fetch(url);
    const tokens = await res.json();
    const _tokens = [];
    tokens.forEach(async token => {
      const res = await fetch(API_ICONS.concat(token.tokenid));
      const _icon = await res.text();
      _tokens.push(_icon);
      if(_tokens.length === tokens.length) setTokens(_tokens);
    })
  }

  useEffect(() => init(), [account]);


  return (
    <div className="card-columns p-4">
      {tokens.length > 0 && tokens.map((icon, key) => <Emoji key={key} icon={icon} />)}
    </div>
  );
}