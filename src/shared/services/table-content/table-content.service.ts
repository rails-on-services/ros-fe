import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableContentService {

  constructor() { }

  public generateTableMultiLinksContent(contents: any[], displayLink: string, linkUrl: string, name = 'name', displayCount = 2) {
    if (!Array.isArray(contents) || contents.length <= 0) { return 'None'; }
    const displayContents = contents.slice(0, displayCount);
    let displayResult = displayContents.map(displayContent => ({
      value: displayContent[name],
      link: `${linkUrl}${displayContent.id}`
    }));

    const hasMoreContent = displayCount < contents.length;
    if (hasMoreContent) {
      const displayMore = {
        value: `${contents.length - displayCount} more`,
        link: displayLink
      };
      displayResult.push(displayMore);
    }
    return displayResult;
  }
}
