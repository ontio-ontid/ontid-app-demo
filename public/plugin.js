function getAppOntid(){var o=document.querySelector('meta[name="ontology-app-ontid"]');o||alert("Please add your app's ONT ID in the meta tag.");var n=o.getAttribute("content").split("@");2!==n.length&&alert("Please add the valid meta value."),window.ontologyAccount.appontid=n[0],window.ontologyAccount.appname=n[1]}function loadLoginPage(){var o=window.ontologyAccount.origin+"/#/signin?appontid="+window.ontologyAccount.appontid+"&appname="+window.ontologyAccount.appname,n=window.open(o,"ONT_ID_Open_Platform","menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,height=600,width=600");window.ontologyAccount.windowRef=n}function insertOntologyStyle(o){var n=document.createElement("style");n.type="text/css",document.getElementsByTagName("head")[0].appendChild(n),n.appendChild(document.createTextNode(o))}window.ontologyAccount=window.ontologyAccount||{},window.ontologyAccount.origin="http://139.219.136.188:10390",getAppOntid(),document.addEventListener("click",function(o){var n=(o=o||window.event).target||ev.srcElement;if(n.getAttribute("class")&&-1<n.getAttribute("class").indexOf("ontid-signin")){var t=n.getAttribute("data-onsuccess");window.ontologyAccount.loginCallback=t,loadLoginPage()}}),window.addEventListener("message",function(o){var n=window.ontologyAccount.origin;if(o.origin===n){var t=JSON.parse(event.data);window.ontologyAccount.account=t,window.ontologyAccount.windowRef&&window.ontologyAccount.windowRef.close(),window.ontologyAccount.windowRef=null,window.ontologyAccount.loginCallback&&window[window.ontologyAccount.loginCallback](t)}});var styleText='.ontid-signin {height: 44px;padding-right:30px;padding-left:60px;border:1px solid #dddddd;border-radius:2px;outline:none;font-size:16px;font-family:"SFProText-Medium";font-weight:500;color:rgba(0,0,0,1);cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAEWklEQVRIS73Wb2gbZRwH8N9z99yfXC5J2/TPUte10nZSbTqD7RBahn0xcPhCRSfLC1vHUBFlU0RkIFj/Dt0bFSZaX6xrrU5ZN9kUUbCjqGhZZ+tKZxX6Qlk3ujbJ5S5/LvfvkctINUuau8FYXoXL93k+z+/5d0Fwiz/oFnuwDj7++Xz3WDQ8s9EAdn88FbYYT7+OfZtoYjWYQGVYYq4I2JgLW+jsSwPb0m4Gvw4+cPQPqdmj7vxwT+RcoeF9Q2cx8qtPWRT7vGZBG8t6kcdbVdIvRkTlkPVZkLPeHt4TXqoEr4P3H10k92zhko0+a+ez21vP7Th0IqJq2XGToA5WbABACGjMgeiv27A/CizdTxlvHB/sehMASLlgMdjsgRo/l5yb/unwzIULr/D1LTxCFGAhCDTjAfu7v7rRcea8tPlV2LwaHdrbr14fLgGrAzwYmkq+mfgCYlkD8cFGQDQLrFifb+urCgFF0c4oZZycGOx8xBVohwpoEjiEhQAw3jqgMAdeXy1ghncE7UCQ1l4eH+h69//hshUWAnn01AlQsA9h3kaDwAsB4HifK5BGJNOEcls/Grx7udCgIlio9Nuvz4BMeRHrDwHH+0EQa1yBdshP6x98ORA+4BosoN//MAkyiIgX60EMNLgGGcpaOzPQUQ8I5XetY4X/TW+OTP48DTIEUKCmCRByf0lt4XP3Dke3Td8QaIdNQydT5xdBZxsQTTOuqwzS2nPjA11Hbhi8hhrk/FIS5BzlukQv0l6deKLr9SJw18iiFWniUU2Vx3HklmmRmSUZZJW4QlnKHDo9eNdrReBDIwtaW6PAbAoKjqAdiCXTZHFZhazhXClLkaHTgx3F4IPHLv4WquEibY2iK1BOq7ASSxBFxRBXccVKy4KPji68TzN4f8/W0rdBuRFkVA3icgokKUEE3g9/J2lkbjDDZcF943Pbl3X+1752EfG88w7UDRPWkmmQ5CSoaYVsbgjBUgxQSisdXlnQjj18bOHH2gDXd0eT89VlEQIrcQV0XYe4JIGWlsid7W1wSULokmQWqRuCT34623PF8PzS3eqlRYF1XMurCQVMi0BcSoCmaZCR1kgk3AkpDaOLl7NgWNeWdkPQ/jE6On9Qw9xbPa0iwrjyayguZyCnG5DL5UCSZTB1DdLSKumORABhHs3/k7aPTmUwj47NHyEs90ykRUR0BVTJqJDKagCEwFoiAaZpQi6jgJVVVvt6e9O6BS1Ll9NwRdJLj8X18xcdnXsRGP5QR5PICJ7ymyib00FKZfNNs2oWZCUFDIVmRZTZ3RW6zUqJgUkTqBZdVYcO9jYXn8NyC7bv+O+diobfqa3md22u5RHL4qJYYafaDykgqyk5cdiM0e8NP92t288+mVq83UbBgpEXekLOYKH3/eOz7asEP1Yn4h0+kWv3slBHY6xhzPy1Jil/UgDftTHLp/b2l/6HsdGM4Ok70NM8VnS1OW7JmxRwdfneJCvfzb+il+os5aGcPgAAAABJRU5ErkJggg==) no-repeat 20px center;}';insertOntologyStyle(styleText);