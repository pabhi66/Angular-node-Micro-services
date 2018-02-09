import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from 'rxjs/Observable';

import {map} from 'rxjs/operators/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  /**
   *
   * @param query string to search elasticsearch index for
   * @returns a sorted array of objects in the form {"_index":"pages","_type":"page","_
   *                                        id":"dX2f3GABdq1HhW_mhFzd","_score":1.0,
   *                                        "_source":
   *                                              {"title":"B","route":"/api/v1/pages/B"}},
   */
  sendQuery(query: string) {
    if (query == null) { return; }

        // TODO add custom search parameters, improve request when page data is indexed,
        //      sort by title and relevance score
         const body = {
          '_source': ['title', 'route'],
          'query': {
            'match_phrase_prefix': {
              'title': {
                'query': query,
                }
              }
            },
            'sort' : 'title.keyword'
          };

        return this.http.post('http://localhost:8080/pages/page/_search', body)
        .map(res => res.json().hits);
  }


}
