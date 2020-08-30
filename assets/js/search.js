(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {
        results[i].title = store[results[i].ref].title;
      }

      if (results.length >= 2) {
        results.sort(
          function(a, b) {
            const aNumArrLen=a.title.match(/(\d+)/g).length;
            const bNumArrLen=b.title.match(/(\d+)/g).length;
            let numArrLen=0;
            aNumArrLen <= bNumArrLen ? numArrLen = aNumArrLen : bNumArrLen;
            for (let idx = 0; idx < numArrLen; idx++) {
              if((Number(a.title.match(/(\d+)/g)[idx]) !== Number(b.title.match(/(\d+)/g)[idx]))){
                return (Number(a.title.match(/(\d+)/g)[idx]) - Number(b.title.match(/(\d+)/g)[idx]));
              }
              // if((Number(a.title.match(/(\d+)/g)[0]) === Number(b.title.match(/(\d+)/g)[0]))){
              //   return (Number(a.title.match(/(\d+)/g)[1]) - Number(b.title.match(/(\d+)/g)[1]));
              // }
              // return (Number(a.title.match(/(\d+)/g)[0]) - Number(b.title.match(/(\d+)/g)[0]));
            }
          })
      }

      for (var i = 0; i < results.length; i++) { // Iterate over the results
        console.log(results[i]);
        var item = store[results[i].ref];
        appendString += '<ul><li class="wow fadeInLeft" data-wow-duration="1.5s" style="visibility: visible; animation-duration: 1.5s; animation-name: fadeInLeft;"><a class="zoombtn" href="' + item.url + '">' + item.title + '</a><p>' + item.excerpt + '</p><a class="btn zoombtn" href="' + item.url + '">Read More</a></li></ul>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<ul><li><a class="zoombtn" href="javascript:void(0);">No results found</li></ul>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function() {
      this.field('id');
      this.field('title', {
        boost: 10
      });
      this.field('category');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'category': window.store[key].category,
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
