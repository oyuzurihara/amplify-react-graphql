import React from "react";
import { useLocation } from 'react-router-dom';

export function Note(){

  const location = useLocation();
  // location.stateはいくつかのプロパティの集まり（現状、descriptionのみ）
  // {xxx}と指定することでプロパティ：xxxの値を取得できる
  // const {description, createdAt, updatedAt} = location.state;
  const {description, createdAt, updatedAt} = location.state;
  const fixedCreatedAt = new Date(createdAt).toLocaleString()
  const fixedUpdatedAt = new Date(updatedAt).toLocaleString()

  return(
    <div>
      <p>内容： {description}</p>
      <p>作成日時： {fixedCreatedAt}</p>
      <p>更新日時： {fixedUpdatedAt}</p>
    </div>
  );

}
