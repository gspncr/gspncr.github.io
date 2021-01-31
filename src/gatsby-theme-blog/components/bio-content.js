import React from "react"
import { Styled } from "theme-ui"

/**
 * Change the content to add your own bio
 */

export default function Bio() {
  return (
    <>
      My name is <Styled.a href="https://www.linkedin.com/in/gspncr/">Gary Spencer</Styled.a> and this is my blog.
      {` `}
      I write most things now on <Styled.a href="https://medium.com/@gspncr">Medium</Styled.a> or in <Styled.a href="https://gist.github.com/gspncr/">GitHub Gists</Styled.a>.
    </>
  )
}
