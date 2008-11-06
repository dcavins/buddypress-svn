jQuery(document).ready( function() {
	jQuery("form#group-search-form").submit(
		function() {
			return false;
		}
	);
	
	jQuery("div#invite-list input").click(
		function() {
			jQuery('#ajax-loader').toggle();

			var friend_id = jQuery(this).val();

			if ( jQuery(this).attr('checked') == true ) {
				var friend_action = 'invite';
			} else {
				var friend_action = 'uninvite';
			}
						
			jQuery.post( ajaxurl, {
				action: 'groups_invite_user',
				'friend_action': friend_action,
				'cookie': encodeURIComponent(document.cookie),
				'_wpnonce': jQuery("input#_wpnonce").val(),
				'friend_id': friend_id,
				'group_id': jQuery("input#group_id").val()
			},
			function(response)
			{	
				if ( jQuery("#message") )
					jQuery("#message").hide();
				
				jQuery('#ajax-loader').toggle();
				response = response.substr(0, response.length-1);
			
				if ( friend_action == 'invite' ) {
					jQuery('#friend-list').append(response);	
				} else if ( friend_action == 'uninvite' ) {
					jQuery('#friend-list li#uid-' + friend_id).remove();
				}
			});
		}
	);
	
	jQuery("#friend-list li a.remove").livequery('click',
		function() {
			jQuery('#ajax-loader').toggle();
			
			var friend_id = jQuery(this).attr('id');
			friend_id = friend_id.split('-');
			friend_id = friend_id[1];
			
			jQuery.post( ajaxurl, {
				action: 'groups_invite_user',
				'friend_action': 'uninvite',
				'cookie': encodeURIComponent(document.cookie),
				'_wpnonce': jQuery("input#_wpnonce").val(),
				'friend_id': friend_id,
				'group_id': jQuery("input#group_id").val()
			},
			function(response)
			{	
				jQuery('#ajax-loader').toggle();
				jQuery('#friend-list li#uid-' + friend_id).remove();
				jQuery('#invite-list input#f-' + friend_id).attr('checked', false);
			});
			
			return false;
		}
	);
	
	jQuery("div#pag a").livequery('click',
		function() { 
			jQuery('#ajax-loader').toggle();

			var fpage = jQuery(this).attr('href');
			fpage = fpage.split('=');

			jQuery.post( ajaxurl, {
				action: 'group_filter',
				'cookie': encodeURIComponent(document.cookie),
				'_wpnonce': jQuery("input#_wpnonce").val(),
				'fpage': fpage[1],
				'num': 5,

				'group-filter-box': jQuery("#group-filter-box").val()
			},
			function(response)
			{	
				response = response.substr( 0, response.length - 1 );
				
				jQuery("div#group-loop").fadeOut(200, 
					function() {
						jQuery('#ajax-loader').toggle();
						jQuery("div#group-loop").html(response);
						jQuery("div#group-loop").fadeIn(200);
					}
				);
			});
			
			return false;
		}
	);
	
	jQuery("div#groupfinder-pag a").livequery('click',
		function() { 
			jQuery('#ajax-loader').toggle();

			var fpage = jQuery(this).attr('href');
			fpage = fpage.split('=');

			jQuery.post( ajaxurl, {
				action: 'group_finder_search',
				'cookie': encodeURIComponent(document.cookie),
				'_wpnonce': jQuery("input#_wpnonce").val(),
				'fpage': fpage[1],
				'num': 5,

				'groupfinder-search-box': jQuery("#groupfinder-search-box").val()
			},
			function(response)
			{	
				response = response.substr( 0, response.length - 1 );

				jQuery("div#group-loop").fadeOut(200, 
					function() {
						jQuery('#ajax-loader').toggle();
						jQuery("div#group-loop").html(response);
						jQuery("div#group-loop").fadeIn(200);
					}
				);
			});
			
			return false;
		}
	);

	jQuery("input#group-filter-box").keyup(	
		function(e) {
			if ( e.which == 13 ) {
				jQuery('#ajax-loader').toggle();
				
				jQuery.post( ajaxurl, {
					action: 'group_filter',
					'cookie': encodeURIComponent(document.cookie),
					'_wpnonce': jQuery("input#_wpnonce").val(),

					'group-filter-box': jQuery("#group-filter-box").val()
				},
				function(response)
				{
					response = response.substr( 0, response.length - 1 );

					jQuery("div#group-loop").fadeOut(200, 
						function() {
							jQuery('#ajax-loader').toggle();
							jQuery("div#group-loop").html(response);
							jQuery("div#group-loop").fadeIn(200);
						}
					);
				});

				return false;
			}
		}
	);
	
	jQuery("input#groupfinder-search-box").keyup(	
		function(e) {
			if ( e.which == 13 ) {
				if ( jQuery("#groupfinder-search-box").val() == '' )
					return false;
					
				jQuery('#ajax-loader').toggle();
					
				jQuery.post( ajaxurl, {
					action: 'group_finder_search',
					'cookie': encodeURIComponent(document.cookie),
					'_wpnonce': jQuery("input#_wpnonce").val(),

					'groupfinder-search-box': jQuery("#groupfinder-search-box").val()
				},
				function(response)
				{
					response = response.substr( 0, response.length - 1 );

					jQuery("div#finder-message").fadeOut(200);
					jQuery("div#group-loop").fadeOut(200, 
						function() {
							jQuery('#ajax-loader').toggle();
							jQuery("div#group-loop").html(response);
							jQuery("div#group-loop").fadeIn(200);
						}
					);
				});

				return false;
			}
		}
	);
});