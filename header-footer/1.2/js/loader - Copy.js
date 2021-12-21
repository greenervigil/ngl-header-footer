var loader = loader || (function(){
	var protocol = location.protocol;
	var domains = ["cengage.com/search/", "cengage.com/search-authoring/", "cengage.com/sandbox/"];
  var app = false;
  var env;
  var version = "1.2";
  for(i = 0; i < domains.length; i++){
    if(window.location.href.indexOf(domains[i]) > -1){
      app = true;
    }
  }
  if(window.location.href == "http://d-ngl.cengage.com/"){
    app = true;
  }
  if (window.location.hostname.toUpperCase().indexOf("S-") != -1 || (window.location.hostname.toUpperCase().indexOf("D-") != -1 && !app))
    env = "s-";
  else if((window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1) && app)
    env = "d-";
  else
    env = "";

  //env = "d-";
  
  return {
  	init: function(css, callback){
        /*injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-header-footer.css?_="+Date.now());
  		if(typeof css == "function" || css.headerCSS == true || css.headerCSS == undefined)
		{
			injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-header.css");
      injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-header-tablet.css");
      injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-header-mobile.css");
		}
		if(typeof css == "function" || css.footerCSS == true || css.footerCSS == undefined)
		{
			injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-footer.css");
      injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-footer-tablet.css");
      injectCSS(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/header-footer/"+version+"/css/ngl-footer-mobile.css");
     // injectCSS(protocol + "//" + env + "cdn.cengage.com/css/apps/search/videoStyle.css");
		}*/
		
		
  		if(!jQuery.support.cors && window.XDomainRequest) {
  			$.when(
    		    $.getScript(protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.XDomainRequest.js"),
    		    $.getScript(protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.cookie.min.js"),

    		    $.Deferred(function( deferred ){
    		        $(deferred.resolve);
    		    })
    		).done(function(){
    			if(navigator.appVersion.indexOf("MSIE 8.0") > -1 || navigator.appVersion.indexOf("MSIE 7.0") > -1)
              	{
    				$(document).ready(function(){
    			    	$("head").append("<link rel='stylesheet' type='text/css' href='" + protocol + "//cdn.cengage.com/css/apps/search/ie-browser-alert.css'>")
    			    	$("body").prepend('<div id="top-message" style="display:none" />');
    			    	$("#top-message").load(protocol + "//cdn.cengage.com/static/apps/search/ie-browser-alert.html",  function(){
    			    		$(this).slideDown("fast");
    			    		$(".icon-remove").click(function(e){
    			    			$("#top-message").slideUp("fast");
    			    			e.stopPropagation();
    			    		});
    			    	});
  		 			});
              	}
  		 		if(typeof css == "function")
	 			{
      		 		css();
	 			}
  		 		else if(typeof callback == "function")
	 			{
  		 			callback();
	 			}
  		 	});
  		}
  		else
  		{
  			$.getScript(protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.cookie.min.js", function(){
    			if(typeof css == "function")
	 			{
    		 		css();
	 			}
		 		else if(typeof callback == "function")
	 			{
		 			callback();
	 			}
  			});
  		}
  	},
      header: function(callback){
      	$(document).ready(function(){
      		var catalog = getCatalogObject();
        	$.when(
    		    $.getScript(protocol + "//" + env + "cdn.cengage.com/js/sites/cengage/validation.min.js"),
    		    //$.getScript(protocol + "//" + env + "cdn.cengage.com/js/sites/cengage/jquery.dropdown.js"), 
           // $.getScript(protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/collapse.js"),
          //  $.getScript(protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/transition.js"),

    		    $.Deferred(function( deferred ){
    		        $(deferred.resolve);
    		    })
    			).done(function(){
    				var CNAME = $.cookie('countryName');
						var CCODE = $.cookie('P_Country_Code');
						/*window.dataLayer = window.dataLayer || [];
						window.dataLayer.push({'countryCode' :CCODE});
						console.log(window.dataLayer);*/
    		    $("#header_include").load(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/" + catalog.path + "-header.html", function () {
  		        var addthis_config = {
  		            pubid: 'clwebmktgja',
  		            services_exclude: 'more',
  		            data_track_clickback: 'true'
  		        }

              //prevents multiple dropdowns from being open at the same time. Also closes dropdowns when clicking on the page.
              $("html").on("click", function(e){
                var target = $(e.target);
                $("#header_include .collapse").each(function(){
                  if(!$(e.target).parents(".collapse").is(this) && !$(e.target).is(this) && ($(this).hasClass('"collapsing') || ($(this).hasClass('collapse') && $(this).hasClass('in')))){
                    $(this).collapse("toggle");
                    var id = $("[data-target=#" + $(this).attr("id") + "]");
                    id.addClass("collapsed");
                  }
                });
              });

  		        //NGL Search Functionality
  		        //var defaultValue = 'Search by title, author, ISBN, or keyword';
  		        $('#header-search').keyup(function (event) {
  		            if (event.keyCode == 13) {
  		                $("#header-submit").click();
  		            }
  		        });
  		        /*$('#header-search').focus(function () {
  		            if (this.value == defaultValue) { this.value = ''; }
  		        });
  		        $('#header-search').blur(function () {
  		            if ($.trim(this.value) == '') { this.value = defaultValue; }
  		        });*/
				
				function loadSearchMenuItems(){
					$.each(searchMenuJson, function(key, value){
						if(typeof value.subMenu === 'undefined'){
							var innerElement = '<li><a href="'+value.href+'" target="'+value.target+'"><i class="fa fa-caret-up menuLinksIcon visibilityHidden" aria-hidden="true"></i><span class="menuLinksText">'+value.text+'</span></a></li>';
						}else if(typeof value.subMenu === 'object'){
							var innerElement = '<li>'+
													'<a href="javascript:void(0);" data-toggle="collapse" data-target="#subMenuItems" class="subMenuparent collapsed" aria-expanded="false">'+
														'<i class="fa fa-caret-up menuLinksIcon" aria-hidden="true"></i>'+
														'<span>'+value.text+'</span>'+
													'</a>'+
												'</li>';
							var subMenuList = '<ul id="subMenuItems" class="collapse no-padding-margin" aria-expanded="false">';
							$.each(value.subMenu, function(key, subMenuItem){
								var subMenuListItem = '<li><a href="'+subMenuItem.href+'" target="'+subMenuItem.target+'">'+subMenuItem.text+'</a></li>';
								subMenuList+=subMenuListItem;
							});
							subMenuList+='</ul>';
						}else{
							console.log("Invalid data");
						}
						$("#headerLeftSearchLinks").append(innerElement);
						if(typeof subMenuList !== 'undefined'){
							$("#headerLeftSearchLinks").append(subMenuList);
						}
					});
      			}
      				
				function setHeaderCustomText() {
					
					if (catalog.category === '200') {
					    var nonBRECountries = [ 'AS', 'AW', 'BB', 'BM', 'BO', 'BR', 'BS', 'BZ', 'CN', 'CO', 'CR', 'CU', 'DM', 'DO', 'EC', 'FM', 'GD', 'GF', 'GP', 'GT', 'GU', 'GY', 'HN', 'HT', 'ID', 'JP', 'KH', 'KP', 'KR', 'KY', 'LA', 'MF', 'MH', 'MM', 'MN', 'MP', 'MQ', 'MX', 'NI', 'PA', 'PE', 'PH', 'PM', 'PR', 'PW', 'PY', 'SR', 'SV', 'SX', 'TH', 'TL', 'TV', 'TW', 'UM', 'US', 'VE', 'VI', 'VN', 'WS' ];
						if ($.inArray(CCODE, nonBRECountries) < 0) {
								$('#catalogMenuText').text('Catalogue');
						}
					}
				}
				
      			if ( typeof searchMenuJson == "undefined") {
					if (catalog.category == "200") {
					  searchMenuJson = JSON.parse('[{"text":"Very Young Learners","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892239","target":"_self"},{"text":"Young Learners","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892241","target":"_self"},{"text":"Teens","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892247","target":"_self"},{"text":"Adult","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892255","target":"_self"},{"text":"Grammar","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904735","target":"_self"},{"text":"Listening & Speaking","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892249","target":"_self"},{"text":"Reading","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892248","target":"_self"},{"text":"Writing","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892244","target":"_self"},{"text":"Reading & Writing","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892242","target":"_self"},{"text":"Dictionaries","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904717","target":"_self"},{"text":"Vocabulary & Idioms","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904733","target":"_self"},{"text":"Pronunciation","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904714","target":"_self"},{"text":"Exam Preparation","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904737","target":"_self"},{"text":"Graded Readers","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892252","target":"_self"},{"text":"Business English","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892253","target":"_self"},{"text":"English for Specific Purposes","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904729","target":"_self"},{"text":"Teacher Development","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904722","target":"_self"},{"text":"Technology","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904722","target":"_self","subMenu":[{"text":"Learn About","href":"http://ngl.cengage.com/assets/html/tech/","target":"_self"},{"text":"My ELT","href":"http://ngl.cengage.com/myelt","target":"_self"},{"text":"myNGconnect","href":"https://www.myngconnect.com","target":"_self"},{"text":"eBooks","href":"http://ngl.cengage.com/assets/html/ebooks/index.html","target":"_self"}]}]');
					} else if (catalog.category == "201") {
					  searchMenuJson = JSON.parse('[{"text":"Reading / Language Arts","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Science","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891945","target":"_self"},{"text":"Social Studies","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891961","target":"_self"},{"text":"Mathematics","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891878","target":"_self"},{"text":"World Languages","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891963","target":"_self"},{"text":"ESL / ELD","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891824","target":"_self"},{"text":"Advanced, Honors, and Electives","href":"http://ngl.cengage.com/assets/html/ae/","target":"_self"},{"text":"Career and Technical Education","href":"http://ngl.cengage.com/assets/html/cte/","target":"_self"},{"text":"Disciplinary Literacy","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891794","target":"_self"},{"text":"Dual Language","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891797","target":"_self"},{"text":"Professional Development","href":"http://ngl.cengage.com/professionaldevelopment","target":"_self"}]');
					}
				}

              
              /*if ( typeof searchMenuJson == "undefined") {
                if (catalog.category == "200") {
                  searchMenuJson = JSON.parse('[{"text":"Very Young Learners","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Young Learners","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892241","target":"_self"},{"text":"Teens","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892247","target":"_self"},{"text":"Adult","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892255","target":"_self"},{"text":"Grammar","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904735","target":"_self"},{"text":"Listening & Speaking","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892249","target":"_self"},{"text":"Reading","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892248","target":"_self"},{"text":"Writing","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892244","target":"_self"},{"text":"Reading & Writing","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892242","target":"_self"},{"text":"Dictionaries","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904717","target":"_self"},{"text":"Vocabulary & Idioms","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904733","target":"_self"},{"text":"Pronunciation","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904714","target":"_self"},{"text":"Exam Preparation","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904737","target":"_self"},{"text":"Graded Readers","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892252","target":"_self"},{"text":"Business English","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294892253","target":"_self"},{"text":"English for Specific Purposes","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904729","target":"_self"},{"text":"Teacher Development","href":"http://ngl.cengage.com/search/showresults.do?N=200+4294904722","target":"_self"}]');
                } else if (catalog.category == "201") {
                  searchMenuJson = JSON.parse('[{"text":"Reading / Language Arts","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Science","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891945","target":"_self"},{"text":"Social Studies","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891961","target":"_self"},{"text":"Mathematics","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891878","target":"_self"},{"text":"World Languages","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891963","target":"_self"},{"text":"ESL / ELD","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891824","target":"_self"},{"text":"Advanced, Honors, and Electives","href":"http://ngl.cengage.com/ae","target":"_self"},{"text":"Career and Technical Education","href":"http://ngl.cengage.com/cte","target":"_self"},{"text":"Disciplinary Literacy","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891794","target":"_self"},{"text":"Dual Language","href":"http://ngl.cengage.com/search/showresults.do?N=201+4294891797","target":"_self"},{"text":"Professional Development","href":"http://ngl.cengage.com/professionaldevelopment","target":"_self"}]');
                }
              }*/
			  
			  setHeaderCustomText();
			  loadSearchMenuItems();
			  
  /*var nowDate = new Date();
  var cssVersion = nowDate.getFullYear()+''+(nowDate.getMonth()+1)+nowDate.getDate()+nowDate.getHours();  
  if (catalog.category == "200") {
      
      if (env == 'p-') {
      	injectCSS('/nglredesign/elt/ngl-home-search.css');
      	injectCSS('/nglredesign/elt/productdetail/css/productDetails.css');
      	injectCSS('/nglredesign/elt/productdetail/css/productDetailsMobile.css');
      	injectCSS('/nglredesign/elt/productdetail/css/productDetailsTablet.css');
      	injectCSS('/nglredesign/elt/series/css/series.css');
      	injectCSS('/nglredesign/elt/series/css/seriesMobile.css');
      	injectCSS('/nglredesign/elt/series/css/seriesTablet.css');
      } else {
    	injectCSS('/nglredesign/elt/ngleltcommon.min.css'+'?_='+cssVersion);
	  }
  }else if (catalog.category == "201") {    
    
      if (env == 'p-') {
      	injectCSS('/nglredesign/school/ngl-home-search.css');
      	injectCSS('/nglredesign/school/productdetail/css/productDetails.css');
      	injectCSS('/nglredesign/school/productdetail/css/productDetailsMobile.css');
      	injectCSS('/nglredesign/school/productdetail/css/productDetailsTablet.css');
      	injectCSS('/nglredesign/school/series/css/series.css');
      	injectCSS('/nglredesign/school/series/css/seriesMobile.css');
      	injectCSS('/nglredesign/school/series/css/seriesTablet.css');
      } else {
    	injectCSS('/nglredesign/school/nglschoolcommon.min.css'+'?_='+cssVersion);
	  }
  }*/
  
				$(".eltBody .collapse").on('show.bs.collapse', function(){
					if($(".subMenuparent > i").css("transform") === "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)"){
						$(".subMenuparent > i").css("transform","");
					}
				});
				
				$('.eltBody #headerLeftSearchLinks li a').click(function(e){
					if(e.currentTarget.className != 'subMenuparent collapsed' && e.target.parentElement.className != 'subMenuparent collapsed' && 
						e.currentTarget.className != 'subMenuparent' && e.target.parentElement.className != 'subMenuparent'){
						var className = $('#subMenuItems').attr('class');
						if(className === "no-padding-margin collapse in"){
							$(".subMenuparent > i").css("transform","rotate(180deg)");
						}
						$('.collapse.in').collapse('hide');
					}
				});
              
              

  		        if ($.cookie("nglRadioId")) {
		            $("#" + $.cookie("nglRadioId")).attr("checked", true);
			        }
    		        
  		        $("#ngl-header-search input[type='radio']").click(function () {
		            if ($('#select-catalog').hasClass("error")) {
		                $('#select-catalog').removeClass("error");
		            }
		            $("#header-search").focus()
			        });
    		        
  		        $("#header-submit").click(function () {
  		        	var selectCatalog = {};
		            var n = validateISBN2($.trim($("#header-search").val()));
		            if (n[0] == true) { $('#header-search').val(n[1]); }
		            var q = $('#header-search').val().replace(/^\s+|\s+$/g, '');
		            if (q == null || q.length == 0 || q == 'Search entire catalog')
		                return false;
		            else {
		                $('#header-search').val(q);
		                var query;
		                if(CNAME != null) {
		                	query = 'http://' + getEnvironment() + '/search/showresults.do?N=' + CNAME + "+" + catalog.category + '&Ntk=NGL&Ntt=' + encodeURI($('#header-search').val());
		                }else{
		                	query = 'http://' + getEnvironment() + '/search/showresults.do?N=' + catalog.category + '&Ntk=NGL&Ntt=' + encodeURI($('#header-search').val())
		                }
		                $('#ngl-search').attr('action', query);
		                //$.cookie("nglRadioId", selectCatalog.id, { expires: (365 * 20), path: "/", domain: getEnvironment() });
		                $('#ngl-search').submit();
		            }
  		        });

  		        $(".sitesLinks").children("li").children("a").click(function (event) {
  		            var url;
  		            if (CNAME) {
  		                url = "http://" + getEnvironment() + "/search/showresults.do?N=" + CNAME + "+" + $(this).attr("link");
  		            }
  		            window.location.href = url;
  		            event.stopPropagation();
  		        });
    		        
    		      if( typeof callback != 'undefined') {
						    callback();
					    }
    		    });
			});
      	});
      	return this;
      },
      footer: function(callback){
      	/*$.when(*/
      		/*$.getScript(protocol + "//" + env + "cdn.cengage.com/libs/bootstrap/3.1.1/js/modal.js"),
          $.getScript(protocol + "//" + env + "cdn.cengage.com/js/contrib/jquery.jwplayer-impl.js"),
  		    $.Deferred(function( deferred ){
  		        $(deferred.resolve);
  		    })*/
    		/*).done(function(){*/
          
      		$(document).ready(function(){
            var catalog = getCatalogObject();
	        	var CNAME = $.cookie('countryName');
	          var CCODE = $.cookie('P_Country_Code');
	        	$("#footer_include").load(protocol + "//" + env + "cdn.cengage.com/static/sites/ngl/" + catalog.footerPath + "-footer.html", function () {
			        //Capture the Country Country Code to display in the footer
			        if(CCODE != null){
			        	$('.countryUSText').html("Country/Region: " + CCODE);
			      	}else{
			      		$('.countryUSText').html("Country/Region:");
			      	}
	            
			        if(typeof callback != 'undefined') {
								callback();
							}
			    	});
      		});
      	/*});*/
      	return this;
      }/*,
      utils: {
      	hideCountry: function(){
      		$(document).ready(function(){
        		if($("#Footer_lower_left img").length == 0)
        		{
        			$("#Footer_lower_left").hide();
        		}
      		});
      	}
      }*/
  };
  function getEnvironment()
  {
  	var hostname;
      if (window.location.hostname.toUpperCase().indexOf("S-") != -1)
          hostname = "s-ngl.cengage.com";
      else if(window.location.hostname.toUpperCase().indexOf("D-") != -1)
          hostname = "d-ngl.cengage.com";
      else if(window.location.hostname.toUpperCase().indexOf("L-") != -1)
      	hostname = "l-ngl.cengage.com";
      else
      	hostname = "ngl.cengage.com";
      return hostname;
  }

  	
	function injectJS(content){
		var script = document.createElement('script');	
		script.type='text/javascript';    
		script.innerHTML = content; 			
		//append in head
		//document.getElementsByTagName('head')[0].appendChild(script);
		var head = document.getElementsByTagName("head")[0];
		head.insertBefore(script, head.firstChild);
	}
  
  function injectCSS(filename){
  	var link = document.createElement('link')
  	link.setAttribute('rel', 'stylesheet');
  	link.setAttribute('type', 'text/css');
  	link.setAttribute('href', filename);
  	document.getElementsByTagName('head')[0].appendChild(link);
  }


  function getParam(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
  }
  function getCatalogObject() {
  	var catalog = {};
    if($("header.elt").length > 0) { //ELT
    	catalog["path"] = 'header-footer/'+version+'/templates/elt/elt';
      catalog["footerPath"] = 'header-footer/'+version+'/templates/elt/elt';
    	catalog["category"] = "200";
    } else if($("header.school").length > 0) { //school
    	catalog["path"] = 'header-footer/'+version+'/templates/school/school';
      catalog["footerPath"] = 'header-footer/'+version+'/templates/school/school';
    	catalog["category"] = "201";
    } else {
    	catalog["path"] = 'header-footer/'+version+'/templates/ngl';
      catalog["footerPath"] = 'header-footer/'+version+'/templates/ngl';
    }
    return catalog;
  }
  

}());