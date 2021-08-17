import React from 'react';

export default function MovieCard (props) {
  const { stars } = props
  return (
    <div>
      <p>{ stars }</p>
    </div>
  )
}
