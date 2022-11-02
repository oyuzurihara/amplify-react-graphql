import React from "react";
import { useLocation } from 'react-router-dom';

export function Note(){

  const location = useLocation();
  // location.stateはいくつかのプロパティの集まり（現状、descriptionのみ）
  // {xxx}と指定することでプロパティ：xxxの値を取得できる
  const {description} = location.state;
  
  return <p>{description}</p>;

}
