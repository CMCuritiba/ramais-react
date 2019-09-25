import React from 'react';
import { latinise } from 'voca';

class Highlighter {
  highlightText(pesquisa, text) {
    const pesquisaLatinised = latinise(pesquisa);
    const textLatinised = latinise(text);

    const reg = `(${pesquisaLatinised})(?![^<]*>|[^<>]*</)`;
    const regex = new RegExp(reg, 'i');

    if (!textLatinised.match(regex)) {
      return text;
    }

    const matchStartPosition = textLatinised.match(regex).index;
    const matchEndPosition =
      matchStartPosition + textLatinised.match(regex)[0].toString().length;

    const originalTextFoundByRegex = text.substring(
      matchStartPosition,
      matchEndPosition
    );
    const result = text.replace(regex, originalTextFoundByRegex);

    const aResult = document.createElement('span');
    aResult.innerHTML = result;

    return <mark>{result}</mark>;
  }
}

export default new Highlighter();
