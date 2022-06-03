var loader = loader || (function(){
	var protocol = location.protocol;
	var domains = ["cengage.com/search/", "cengage.com/search-authoring/", "cengage.com/sandbox/", "eltngl.com/", "eltngl.com/search/", "eltngl.com/search-authoring/"];
  var app = false;
  var env;
  var version = "1.2";
  for(i = 0; i < domains.length; i++){
    if(window.location.href.indexOf(domains[i]) > -1){
      app = true;
    }
  }
  if(window.location.href == "https://d-ngl.cengage.com/"){
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
		injectCSS("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
    injectCSS("https://cdn.cengage.com/libs/fonts/summer-font/summer-font.css");
		
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
	          		var CCODE = getCountryCode();
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
					if (catalog.category == "200") {
						var innerElement ="";
						$("#headerCatalogLinks").append('<div class="CatalogueListAge col-lg-2 col-md-2 col-sm-3 col-xs-12"> <h2>Courses for... </h2></div>');	
							$("#headerCatalogLinks").append('<div class="academicSkills CatalogueListType col-lg-3 col-md-3 col-sm-3 col-xs-12"> <h2>Academic Skills </h2></div>');
							$("#headerCatalogLinks").append('<div class="resources CatalogueListType col-lg-3 col-md-3 col-sm-3 col-xs-12"> <h2>Resources</h2></div>');
							$("#headerCatalogLinks").append('<div class="nglLink CatalogueListType col-lg-4 col-md-4 col-sm-12 col-xs-12"> </div>');
							var CatalogueListTypeColumnCount=0;var CatalogueListTypeColumnCount=0;
							$.each(searchMenuJson, function(key, value){
							if(typeof value.subMenu === 'undefined'){
								innerElement =innerElement+ '<a href="'+value.href+'" target="'+value.target+'"><span class="menuLinksText">'+value.text+'</span></a>';
							}else if(typeof value.subMenu === 'object'){						
								
								$.each(value.subMenu, function(key, subMenuItem){
									var subMenuListItem = '<a href="'+subMenuItem.href+'" target="'+subMenuItem.target+'"><span class="menuLinksText">'+subMenuItem.text+'</span></a>';
									innerElement+=subMenuListItem;
									
								});
							}else{
								console.log("Invalid data");
							}
							
							if(key < 6){
								$(".CatalogueListAge").append('<div class="">'+innerElement+'</div>');	
							} else { 
							
							if(key>=6 && key <12) {
								$(".academicSkills").append('<div>'+innerElement+'</div>');
							} else if(key>=12 && key <19){
								$(".resources").append('<div> '+innerElement+'</div>');
							} 
							else {
								$(".nglLink").append('<div>'+innerElement+'</div>');
							}
							}
							/*else{
								CatalogueListTypeColumnCount++;
								if((key-4)%6==0){
									if(key==10){
										$(".CatalogueListType").append('<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12"> '+innerElement+'</div>');
									}
									else {
										$(".CatalogueListType").append('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"> '+innerElement+'</div>');
									}
									
								}else {
									$(".CatalogueListType div:last-child").append(''+innerElement+'');
								}
								
							}*/	
console.log(CatalogueListTypeColumnCount);
							innerElement="";
						});
						$('#catalogMenuText').text('Search Products');
					} else {
						$.each(searchMenuJson, function(key, value){
							if(typeof value.subMenu === 'undefined'){
								var innerElement = '<li><a href="'+value.href+'" target="'+value.target+'"><span class="menuLinksText">'+value.text+'</span></a></li>';
							}else if(typeof value.subMenu === 'object'){
								var innerElement = '<li>'+
														'<a href="javascript:void(0);" data-toggle="collapse" data-target="#subMenuItems" class="subMenuparent collapsed" aria-expanded="false">'+
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
      			}
      				
				function setHeaderCustomText() {
					
					if (catalog.category === '200') {
					    var nonBRECountries = [ 'AS', 'AW', 'BB', 'BM', 'BO', 'BR', 'BS', 'BZ', 'CN', 'CO', 'CR', 'CU', 'DM', 'DO', 'EC', 'FM', 'GD', 'GF', 'GP', 'GT', 'GU', 'GY', 'HN', 'HT', 'ID', 'JP', 'KH', 'KP', 'KR', 'KY', 'LA', 'MF', 'MH', 'MM', 'MN', 'MP', 'MQ', 'MX', 'NI', 'PA', 'PE', 'PH', 'PM', 'PR', 'PW', 'PY', 'SR', 'SV', 'SX', 'TH', 'TL', 'TV', 'TW', 'UM', 'US', 'VE', 'VI', 'VN', 'WS' ];
						if ($.inArray(CCODE, nonBRECountries) < 0) {
								$('.browseCatalogMenuText').text('Browse the Catalogue');
						}
					}
				}
      			if ( typeof searchMenuJson == "undefined") {
					if (catalog.category == "200") {
					  searchMenuJson = JSON.parse('[{"text":"Pre-Primary/Very Young Learners","href":"/assets/html/veryyounglearners/","target":"_self"},{"text":"Primary/Young Learners","href":"/search/showresults.do?N=200&Ntk=NGL&Ntt=younglearnerspromotion","target":"_self"},{"text":"Secondary/Teens","href":"/assets/html/teens/ ","target":"_self"},{"text":"Content-Based English/Literacy","href":"/assets/html/content-based-english/","target":"_self"},{"text":"Adult","href":"/assets/html/adult/","target":"_self"},{"text":"US Adult Ed","href":"/assets/html/usadulted/","target":"_self"},{"text":"Grammar","href":"/assets/html/academic/grammar/","target":"_self"},{"text":"Listening and Speaking","href":"/assets/html/academic/listeningandspeaking/","target":"_self"},{"text":"Reading","href":"/assets/html/academic/reading/","target":"_self"},{"text":"Writing","href":"/assets/html/academic/writing/","target":"_self"},{"text":"Reading and Writing","href":"/assets/html/academic/readingandwriting/","target":"_self"},{"text":"Pronunciation","href":"/assets/html/academic/pronunciation/","target":"_self"},{"text":"Exam Preparation","href":"/search/showresults.do?N=200+4294904737","target":"_self"},{"text":"Graded Readers","href":"/search/showresults.do?N=200+4294892252","target":"_self"},{"text":"Teacher Development","href":"/search/showresults.do?N=200+4294904722","target":"_self"},{"text":"Vocabulary and Idioms","href":"/search/showresults.do?N=200+4294904733","target":"_self"},{"text":"Business English","href":"/search/showresults.do?N=200+4294892253","target":"_self"},{"text":"English for Specific Purposes","href":"/search/showresults.do?N=200+4294904729","target":"_self"},{"text":"Dictionaries","href":"/search/showresults.do?N=200+4294904717","target":"_self"},{"text":"Go here for U.S. PreK-12 Programs","href":"https://ngl.cengage.com/","target":"_self"}]');
					} else if (catalog.category == "201") {
					  searchMenuJson = JSON.parse('[{"text":"Reading / Language Arts","href":"/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Science","href":"/search/showresults.do?N=201+4294891945","target":"_self"},{"text":"Social Studies","href":"/search/showresults.do?N=201+4294891961","target":"_self"},{"text":"Mathematics","href":"/search/showresults.do?N=201+4294891878","target":"_self"},{"text":"World Languages","href":"/search/showresults.do?N=201+4294891963","target":"_self"},{"text":"ESL / ELD","href":"/search/showresults.do?N=201+4294891824","target":"_self"},{"text":"MindTap","href":"/mindtap","target":"_self"},{"text":"Advanced, Honors, and Electives","href":"/assets/html/ae/","target":"_self"},{"text":"Career and Technical Education","href":"/assets/html/cte/","target":"_self"},{"text":"Disciplinary Literacy","href":"/search/showresults.do?N=201+4294891794","target":"_self"},{"text":"Leveled Book Finder","href":"/bookfinder","target":"_self"},{"text":"Dual Language","href":"/showresults.do?N=201+4294891797","target":"_self"},{"text":"Professional Development","href":"/professionaldevelopment","target":"_self"}]');
					}
				}

              
              /*if ( typeof searchMenuJson == "undefined") {
                if (catalog.category == "200") {
                  searchMenuJson = JSON.parse('[{"text":"Very Young Learners","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Young Learners","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892241","target":"_self"},{"text":"Teens","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892247","target":"_self"},{"text":"Adult","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892255","target":"_self"},{"text":"Grammar","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904735","target":"_self"},{"text":"Listening & Speaking","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892249","target":"_self"},{"text":"Reading","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892248","target":"_self"},{"text":"Writing","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892244","target":"_self"},{"text":"Reading & Writing","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892242","target":"_self"},{"text":"Dictionaries","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904717","target":"_self"},{"text":"Vocabulary & Idioms","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904733","target":"_self"},{"text":"Pronunciation","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904714","target":"_self"},{"text":"Exam Preparation","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904737","target":"_self"},{"text":"Graded Readers","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892252","target":"_self"},{"text":"Business English","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294892253","target":"_self"},{"text":"English for Specific Purposes","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904729","target":"_self"},{"text":"Teacher Development","href":"https://ngl.cengage.com/search/showresults.do?N=200+4294904722","target":"_self"}]');
                } else if (catalog.category == "201") {
                  searchMenuJson = JSON.parse('[{"text":"Reading / Language Arts","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891966","target":"_self"},{"text":"Science","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891945","target":"_self"},{"text":"Social Studies","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891961","target":"_self"},{"text":"Mathematics","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891878","target":"_self"},{"text":"World Languages","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891963","target":"_self"},{"text":"ESL / ELD","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891824","target":"_self"},{"text":"Advanced, Honors, and Electives","href":"https://ngl.cengage.com/ae","target":"_self"},{"text":"Career and Technical Education","href":"https://ngl.cengage.com/cte","target":"_self"},{"text":"Disciplinary Literacy","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891794","target":"_self"},{"text":"Dual Language","href":"https://ngl.cengage.com/search/showresults.do?N=201+4294891797","target":"_self"},{"text":"Professional Development","href":"https://ngl.cengage.com/professionaldevelopment","target":"_self"}]');
                }
              }*/
			  
			  setHeaderCustomText();
			  loadSearchMenuItems();
			  
			  // DCSB2B-968 : Favico link added to head
			  $('head').append('<link rel="icon" type="image/x-icon" href="https://assets-cdn.nationalgeographic.com/natgeo/static/icons/favicon.ico">');
			  
			  
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
		                	query = 'https://' + getEnvironment() + '/search/showresults.do?N=' + CNAME + "+" + catalog.category + '&Ntk=NGL&Ntt=' + encodeURI($('#header-search').val());
		                }else{
		                	query = 'https://' + getEnvironment() + '/search/showresults.do?N=' + catalog.category + '&Ntk=NGL&Ntt=' + encodeURI($('#header-search').val())
		                }
		                $('#ngl-search').attr('action', query);
		                //$.cookie("nglRadioId", selectCatalog.id, { expires: (365 * 20), path: "/", domain: getEnvironment() });
		                $('#ngl-search').submit();
		            }
  		        });

  		        $(".sitesLinks").children("li").children("a").click(function (event) {
  		            var url;
  		            if (CNAME) {
  		                url = "https://" + getEnvironment() + "/search/showresults.do?N=" + CNAME + "+" + $(this).attr("link");
  		            }
  		            window.location.href = url;
  		            event.stopPropagation();
  		        });
    		    /*Detecting mobile for elt site  */
				if (catalog.category == "200") {
					var detectWidth=$(window).width() ;
					var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
					if(detectWidth <= 1007 || (isMobile && detectWidth <= 1024)){
						$('#header_include').addClass('mobileMenuView');
						$('.mobileMenuView #HamburgerMenu').removeClass('collapse').removeClass('navbar-collapse');		
						$('.mobileMenuView a[data-target="#headerLeftSearchLinks"] #catalogMenuText').text('Search');
						$('.mobileMenuView #HamburgerMenu').hide();
					}
					else {
						$('#header_include').removeClass('mobileMenuView');
						$('#HamburgerMenu').addClass('navbar-collapse');
						$('a[data-target="#headerLeftSearchLinks"] #catalogMenuText').text('Search Products');
					}
					if(!($('#header_include').hasClass('mobileMenuView'))){
						$('.mainSearchMenuGA.collapse').removeAttr('style');			
					}else {
						$('#headerCatalogLinks').hide();
					}
				}	
				/*Detecting mobile for elt site  */	  
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
	          	var CCODE = getCountryCode();

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
			    	continueUrl();
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

  function getCountryCode() {
		var countryCode;
        if ($.cookie("P_Country_Cd")) {
            countryCode = $.cookie("P_Country_Cd");
        } else {
            $.post("https://" + env + "ngl.cengage.com/search/geocountrylocator",
                {},
                function (data, status) {
                    countryCode = data.country;
                    $.cookie("P_Country_Cd", countryCode, { path: "/;secure", expires: 0 });
                });
        }
        return countryCode;
    }

  
   function continueUrl(){
	   $(".eltBuyBox a").each(function(){
			if($(this).attr('href').indexOf("www.cengage.com/shop") > -1 || $(this).attr('href').indexOf("www.cengage.ca/shop") > -1) {
				if($(this).attr('href').indexOf("?") > -1) {
					$(this).attr('href', $(this).attr('href') + "&continueUrl=" + escape(location.href).replace(/\//g, '%2F'));
				} else {
					$(this).attr('href', $(this).attr('href') + "?continueUrl=" + escape(location.href).replace(/\//g, '%2F'));
				}
			}
		});
		$(".searchSingleItemButtonContainer a").each(function(){
			if($(this).attr('href').indexOf("www.cengage.com/shop") > -1 || $(this).attr('href').indexOf("www.cengage.ca/shop") > -1) {
				if($(this).attr('href').indexOf("?") > -1) {
					$(this).attr('href', $(this).attr('href') + "&continueUrl=" + escape(location.href).replace(/\//g, '%2F'));
				} else {
					$(this).attr('href', $(this).attr('href') + "?continueUrl=" + escape(location.href).replace(/\//g, '%2F'));
				}
			}
		});
   }
}());

//DCSRUN-117 NGL ELT Header navigation 


if ($('body').hasClass('eltBody') ) {	
	console.log('catalog.category: '+$('body').hasClass('eltBody'))
	window.onresize = function() {
	console.log('resize');
	
		var detectWidth=$(window).width();
		var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		if(detectWidth <= 1007 || (isMobile && detectWidth <= 1024)){
			
			$('#header_include').addClass('mobileMenuView');
			$('.mobileMenuView #HamburgerMenu').removeClass('collapse').removeClass('navbar-collapse');		
			$('.mobileMenuView a[data-target="#headerLeftSearchLinks"] #catalogMenuText').text('Search');
			//mobileMenuView .menu_contact_sales a').text('Contact Sales Representative');
			$('.mobileMenuView a[data-target="#headerCatalogLinks"]').removeClass('flyoutSubmenu');
		}
		else {
			
			$('#HamburgerMenu').css('display','block');						
			$('#header_include').removeClass('mobileMenuView');
			$('#HamburgerMenu').addClass('navbar-collapse');
			$('a[data-target="#headerLeftSearchLinks"] #catalogMenuText').text('Search Products');
			//$('.menu_contact_sales a').text('Contact Sales Rep');
			$('a[data-target="#headerCatalogLinks"]').addClass('flyoutSubmenu');
		}
		
		if(!($('#header_include').hasClass('mobileMenuView'))){
			$('.mainSearchMenuGA.collapse').removeAttr('style');			
		}else {
			$('#headerCatalogLinks').hide();
		}
};




$(document).ready(function(){
	$('body').on('click', '.mobileMenuView span.closeSubnav', function(e){
		e.stopPropagation();
		var target=$(this).parents('ul.mainSearchMenuGA').attr('id');					
		$('#'+target+'').animate({'width': 'toggle'});	
	});
	$('body').on('click','.mobileMenuView #HamburgerMenu ul li a', function(e){						
		e.stopPropagation();
		var selector= $(this).attr('data-target');
		$(selector).animate({'width':'toggle'});
		$('.mobileMenuView ul.mainSearchMenuGA').each(function(){
			if(selector.indexOf($(this).attr('id'))==-1) {
			if($(this).css('display')=="block") {
				$(this).css('display','none');
			}
			}
		});
	});
	$('body').on('click','.mobileMenuView #headerLeftMenu button[data-target="#HamburgerMenu"]', function(e){
		e.stopPropagation();
		var firstTimeclick=false;
		if($('.mobileMenuView #HamburgerMenu').hasClass('navbar-collapse')){
			$('.mobileMenuView #HamburgerMenu').removeClass('collapse').removeClass('navbar-collapse');		
			firstTimeclick= true;							
		}
		if(!firstTimeclick){
		$('.mobileMenuView #HamburgerMenu').removeClass('collapse').removeClass('navbar-collapse');						
		$('.mobileMenuView #HamburgerMenu').animate({'width':'toggle' });
		$('.mobileMenuView ul.mainSearchMenuGA').each(function(){
			if($(this).css('display')=="block") {
				$(this).animate({'width':'toggle'});
			}
		});
		}
	});
	
	$('body').on('click','.mobileMenuView #headerLeftMenu a[data-target="#headerLeftSearchLinks"]', function(e){
		e.stopPropagation();
		if($('.mobileMenuView #HamburgerMenu').css('display')=="block"){
			$('.mobileMenuView #HamburgerMenu').animate({'width':'toggle' });
		}
		
		$('.mobileMenuView #headerLeftSearchLinks').animate({'width':'toggle'});
	});
	
	
	
	$('body').on('click','.mobileMenuView span.closeMainMenu', function(e){
		e.stopPropagation();
		$('.mobileMenuView #HamburgerMenu').animate({'width':'toggle'});
	});
	
	/*DCSB2B-3028- Hover Functionality on browse online catalog menu*/
	var subMenu_Open=false;
	$('body').on('mouseenter','#headerCatalogLinks', function(){
		subMenu_Open=true;
	});
	/*$('body').on('mouseenter','.flyoutSubmenu', function(){
		subMenu_Open=true;
		$('.flyoutSubmenu').addClass('subMenuOpen');
		$('#headerCatalogLinks').addClass('in');
	});*/
	
	$('body').on('mouseenter','ul.mainMenuGA li a', function(){
		if($(this).hasClass('flyoutSubmenu')){
			subMenu_Open=true;
			$('.flyoutSubmenu').addClass('subMenuOpen');
			$('#headerCatalogLinks').addClass('in');
		}
		else {
			subMenu_Open=false;
			$('.flyoutSubmenu').removeClass('subMenuOpen');
			$('#headerCatalogLinks').removeClass('in');
		}
	});
	$('body').on('mouseleave','.flyoutSubmenu', function(){
		if(!subMenu_Open){
		$('.flyoutSubmenu').removeClass('subMenuOpen');
		$('#headerCatalogLinks').removeClass('in');
		}
	});

	$('body').on('mouseleave','#headerCatalogLinks.in', function(){
		subMenu_Open=false;
		$('.flyoutSubmenu').removeClass('subMenuOpen');
		$(this).removeClass('in');
	});
	/*DCSB2B-3028- Hover Functionality on browse online catalog menu*/

});


}




//DCSRUN-117 NGL ELT Header navigation End