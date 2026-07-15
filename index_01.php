<?php global $codedokan;
get_header(); ?>

<?php
// Check if the shortcode [t4b-ticker] exists
if (shortcode_exists('t4b-ticker')) {
    echo do_shortcode('[t4b-ticker]');
}
?>

<section id="top-lead-content"> 
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-9">
                <section id="leadSection">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <div class="row">
                                <div class="col-lg-12 col-12">
                                    <div class="lead_heaight mb-3">
                                        <div class="common-border-box">
                                            <div class="lead-news topfirst-leadnews" id="lead-news">
                                                <?php
                                                global $codedokan;
                                                $selected_category = !empty($codedokan['home_lead_selected']) ? $codedokan['home_lead_selected'] : 1;

                                                $args = array(
                                                    'posts_per_page' => 1,
                                                    'order' => 'DESC',
                                                    'cat' => $selected_category,
                                                );
                                                $lead_post = new WP_Query($args);
                                                ?>

                                                <?php if ($lead_post->have_posts()) : while ($lead_post->have_posts()) : $lead_post->the_post(); ?>
                                                    <div class="flex-content position-relative" id="flex-left-image">
                                                        <div class="d-flex mobile_clmn">
                                                            <div class="flex-shrink-0">
                                                                <div class="img-content position-relative text-center">
                                                                    <span class="imgWrep"><?php custom_post_thumbnail(); ?></span>
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1">
                                                                <h4 class="title"><?php the_title(); ?></h4>
                                                                <div class="summery"><?php custom_length_excerpt(20); ?></div>
                                                            </div>
                                                        </div>
                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                    </div>
                                                <?php endwhile; wp_reset_postdata(); else : ?>
                                                    <p>No posts found</p>
                                                <?php endif; ?>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="common-border-box mt-3 mb-3">
                                        <div class="row sub-news">
                                            <?php
                                            $args = array(
                                                'posts_per_page' => 6, 
                                                'offset' => 1, 
                                                'order' => 'DESC',
                                                'cat' => $selected_category, // Added the same category filter here
                                            );
                                            $lastpost = new WP_Query($args); ?>
                                            <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                    <div class="col-6 col-lg-4">
                                                        <div class="common-card-content position-relative ">
                                                            <div class="image-lead position-relative text-center">
                                                                <span class="imgWrep">
                                                                    <?php custom_post_thumbnail(); ?>
                                                                </span>
                                                                <a class="link" href="<?php the_permalink(); ?>"></a>
                                                            </div>
                                                            <div class="news-content-box">

                                                                <div class="position-relative">
                                                                    <h5 class="title">
                                                                        <?php the_title(); ?>
                                                                    </h5>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                            <?php endwhile;
                                                wp_reset_postdata();
                                            else :
                                                echo '<P>no posts found</P>';
                                            endif; ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="common-border-box">
                                <div class="selected-news">
                                    <?php
                                    // Retrieve the selected category ID from Redux.
                                    $selected_category = !empty($codedokan['home_cat_selected']) ? $codedokan['home_cat_selected'] : 1;
                                
                                    $args = array(
                                        'cat' => $selected_category, // Use the selected category from Redux.
                                        'posts_per_page' => 6, // Limit to 6 posts.
                                        'order' => 'DESC' // Fetch latest posts first.
                                    );
                                    $lastpost = new WP_Query($args);
                                    $post_counter = 0;
                                    ?>
                                
                                    <?php if ($lastpost->have_posts()) : ?>
                                        <?php while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                            <?php $post_counter++; ?>
                                
                                            <?php if ($post_counter == 1) : ?>
                                                <!-- First news item with distinct styling -->
                                                <div class="first-news-item">
                                                    <a class="_link" href="<?php the_permalink(); ?>">
                                                        <div class="img-content">
                                                            <?php custom_post_thumbnail(); ?>
                                                        </div>
                                                        <h4 class="title"><?php the_title(); ?></h4>
                                                    </a>
                                                </div>
                                            <?php else : ?>
                                                <!-- Standard layout for remaining posts, title only -->
                                                <div class="custom-sub-news">
                                                    <div class="custom-flex-content position-relative">
                                                        <div class="d-flex">
                                                            <div class="custom-img-wrapper">
                                                                <a class="_link" href="<?php the_permalink(); ?>">
                                                                    <div class="img-content">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                    </div>
                                                                </a>
                                                            </div>
                                
                                                            <div class="custom-caption-wrapper">
                                                                <a class="_link" href="<?php the_permalink(); ?>">
                                                                    <h4 class="title"><?php the_title(); ?></h4>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <?php endif; ?>
                                        <?php endwhile; ?>
                                        <?php wp_reset_postdata(); ?>
                                    <?php else : ?>
                                        <p>No posts found in this category.</p>
                                    <?php endif; ?>
                                
                                    <!-- Optional ad section -->
                                    <?php if (isset($codedokan['subnews_ads320x100']) && !empty($codedokan['subnews_ads320x100'])): ?>
                                        <div style="min-width: 320px; min-height: 100px; text-align: center;">
                                            <?php echo $codedokan['subnews_ads320x100']; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>

                                <!--<div class="selected-news">
        <//?php 
        $args = array(
            'posts_per_page' => 6,
            'offset' => 7,
            'order' => 'DESC'
        );
        $lastpost = new WP_Query($args); 
        $post_counter = 0;
        ?>

        <//?php if ($lastpost->have_posts()) : ?>
            <//?php while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                <//?php $post_counter++; ?>
                
                <//?php if ($post_counter == 1) : ?>
                    
                    <div class="first-news-item">
                        <a class="_link" href="<//?php the_permalink(); ?>">
                            <div class="img-content">
                                <//?php custom_post_thumbnail(); ?>
                            </div>
                            <h4 class="title"><//?php the_title(); ?></h4>
                        </a>
                    </div>
                <//?php else : ?>
                   
                    <div class="custom-sub-news">
                        <div class="custom-flex-content position-relative">
                            <div class="d-flex">
                                <div class="custom-img-wrapper">
                                    <a class="_link" href="<//?php the_permalink(); ?>">
                                        <div class="img-content">
                                            <//?php custom_post_thumbnail(); ?>
                                        </div>
                                    </a>
                                </div>

                                <div class="custom-caption-wrapper">
                                    <a class="_link" href="<//?php the_permalink(); ?>">
                                        <h4 class="title"><//?php the_title(); ?></h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                <//?php endif; ?>
            <//?php endwhile; ?>
            <//?php wp_reset_postdata(); ?>
        <//?php else : ?>
            <p>No posts found</p>
        <//?php endif; ?>

       
        <//?php if (isset($codedokan['subnews_ads320x100']) && !empty($codedokan['subnews_ads320x100'])): ?>
            <div style="min-width: 320px; min-height: 100px; text-align: center;">
                <//?php echo $codedokan['subnews_ads320x100']; ?>
            </div>
        <//?php endif; ?>
    </div>-->
                            </div>

                            <!-- <div class="common-border-box">
                                <div class="selected-news">
                                    <//?php 
                                    $args = array('posts_per_page' => 6, 'offset'=>7, 'order' => 'DESC',);
                                    $lastpost = new WP_Query($args); ?>
                                    <//?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>


                                    <div class="sub-news">
                                        <div class="flex-content position-relative" id="flex-left-image">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0">
                                                    <a class="_link" href="<//?php the_permalink(); ?>">
                                                        <div class="img-content position-relative text-center">
                                                            <span class="imgWrep">
                                                                <//?php custom_post_thumbnail(); ?>
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>

                                                <div class="flex-grow-1">
                                                    <a class="_link" href="<//?php the_permalink(); ?>">
                                                        <h4 class="title"><//?php the_title(); ?></h4>
                                                    </a>

                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <//?php endwhile;
                                    wp_reset_postdata();
                                    else :
                                        echo '<P>no posts found</P>';
                                    endif; ?>

                                <//?php if (isset($codedokan['subnews_ads320x100']) && !empty($codedokan['subnews_ads320x100'])): ?>
                                    <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                                        <//?php echo $codedokan['subnews_ads320x100']; ?>
                                    </div>
                                <//?php endif; ?>

                                </div>
                            </div>-->
                        </div>
                </section>
            </div>

            <div class="col-12 col-md-3">
                <?php if (isset($codedokan['sidebar_ads320x100']) && !empty($codedokan['sidebar_ads320x100'])): ?>
                    <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['sidebar_ads320x100']; ?>
                    </div>
                <?php endif; ?>

                <?php require get_template_directory() . '/inc/latest_popular_tab.php'; ?>

            </div>
        </div>

    </div>
</section>
<!--old-video Section-->
<section class="bg-white">
    <div class="container-fluid my-3">
        <div class="row">
            <div class="col-md-4 mb-3">
                <style>
                    #static_opinion .menu-link {
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 10px;
                    }

                    #static_opinion .flex-content {
                        background: #fff9e1;
                        border-bottom: 3px solid #d60000;
                        border-radius: 5px 5px;
                        padding: 15px;
                        margin-bottom: 15px;
                    }

                    #static_opinion .flex-content .img-content {
                        height: 80px;
                        width: 80px;
                        border-radius: 50%;
                        border: 2px solid #fe0002;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }

                    #static_opinion .flex-content .img-content img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        object-fit: cover;
                    }

                    #static_opinion .rpt {
                        display: block;
                        font-weight: bold;
                        margin: 3px 0;
                    }

                    #static_opinion .rpt_dg {
                        display: block;
                        color: #797979;
                        font-size: 14px;
                        line-height: 19px;
                    }

                    #static_opinion h4.title {
                        font-size: 18px;
                        margin: 10px 0 20px 0;
                    }

                    #static_opinion .summery {
                        text-align: justify;
                        -webkit-line-clamp: 3;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-weight: normal;
                    }

                    #static_opinion a:hover .summery {
                        color: #000
                    }

                    #static_opinion {
                        margin-bottom: 0px;
                    }

                    #static_opinion .flex-control-nav {
                        text-align: center;
                        display: block;
                    }

                    #static_opinion .flex-content:hover h4.title {
                        color: #1a73e8 !important;
                    }
                </style>
                <div class="common-border-box h-100">
                    <section class="flexslider" id="static_opinion">
                        <div class="menu-link">
                            <a href="<?php echo get_category_link($codedokan['home_cat_1']); ?>">
                                <?php $image_id = get_term_meta($codedokan['home_cat_1'], 'showcase-taxonomy-image-id', true); ?>
                                <?php if ($image_id) { ?>
                                    <span class="home_menu_icon">
                                        <img src="<?php echo wp_get_attachment_image_url($image_id, 'full', true); ?>"
                                            draggable="false">
                                    </span>
                                <?php } ?>
                                <span><?php echo get_the_category_by_id($codedokan['home_cat_1']); ?></span>
                            </a>
                        </div>
                        <ul class="slides">
                            <li>

                                <div class="news-separator-virticle-border"></div>

                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_1'] . ' & posts_per_page=3'); ?>
                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                        <div class="flex-content">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-1 text-center" style="max-width: 140px">
                                                    <a href="<?php the_permalink(); ?>">
                                                        <div class="img-content position-relative text-center mx-auto"><span
                                                                class="_imgWrep">
                                                                <?php custom_post_thumbnail(); ?>
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <a href="<?php the_permalink(); ?>">
                                                        <h4 class="title"><?php the_title(); ?></h4>
                                                    </a>
                                                    <div class="summery">
                                                        <?php custom_length_excerpt(30); ?>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                <?php endwhile;
                                    wp_reset_postdata();
                                endif; ?>

                            </li>
                            <li>

                                <div class="news-separator-virticle-border"></div>

                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_1'] . ' & posts_per_page=3 & offset=3'); ?>
                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                        <div class="flex-content">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-1 text-center" style="max-width: 140px">
                                                    <a href="<?php the_permalink(); ?>">
                                                        <div class="img-content position-relative text-center mx-auto">
                                                            <span class="_imgWrep">
                                                                <?php custom_post_thumbnail(); ?>
                                                            </span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <a href="<?php the_permalink(); ?>">
                                                        <h4 class="title"><?php the_title(); ?></h4>
                                                    </a>
                                                    <div class="summery">
                                                        <?php custom_length_excerpt(30); ?>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                <?php endwhile;
                                    wp_reset_postdata();
                                endif; ?>

                            </li>
                        </ul>

                    </section>
                </div>
            </div>
           
            
            
            <!-- 202 -->
            

 <div class="col-md-4 mb-3">
                <div class="opinion-css">
                    <style type="text/css">
                        :root {
                            --pollOptionRadioBg: #ccc;
                            --pollOptionRadioBgActive: #e3e4e8;
                            --pollOptionRadioBorder: #c7cad1;
                            --pollOptionRadioBorderActive: #c7cad1;
                        }

                        #home-online-poll .menu-link {
                            font-weight: bold;
                            font-size: 18px;
                            margin-left: 10px;
                            border-bottom: 2px solid #b32819;
                            padding-bottom: 10px;
                        }

                        #home-online-poll .menu-link a {
                            font-size: 20px;
                        }

                        .menu-link .home_menu_icon img {
                            width: 30px;
                        }

                        #home-online-poll .slides,
                        #home-online-poll .slides li {
                            width: calc(100% - 5px) !important;
                        }

                        #home-online-poll .slides>li {
                            border: 1px solid #e2e2e2;
                            border-radius: 5px;
                            padding: 15px;
                            margin: 5px;
                        }

                        #home-online-poll img.img-fluid {
                            border-radius: 5px;
                        }

                        .cat_summary_block {
                            position: relative;
                            line-height: 40px;
                        }

                        .poll_item_block {
                            display: flex;
                            width: 100%;
                            background-color: #fff
                        }

                        .poll_block {}

                        .poll_block h4 {
                            font-size: 16px;
                            line-height: 20px
                        }

                        .poll_block>p {
                            margin: 5px 0 15px 0;
                            font-size: 14px
                        }

                        .polling_submit_block {
                            display: block;
                            text-align: left;
                            padding: 0px 7px 10px 7px;
                            line-height: 28px;
                            _border: 1px solid #e2e2e2;
                            _border-top: 0px;
                            _height: 250px;
                            /*315px;*/
                        }

                        .polling_submit_block>p {
                            font-size: 15px;
                            line-height: 22px;
                            font-weight: bold;
                        }

                        .polling_submit_block .options_block {
                            display: block;
                            text-align: left
                        }

                        .polling_submit_block .options_block ul {
                            list-style: none;
                            padding: 0
                        }

                        .polling_submit_block .options_block ul li {
                            display: flex;
                            position: relative;
                            height: 22px;
                            line-height: 22px;
                            margin-bottom: 10px;
                        }

                        .polling_submit_block .options_block ul li>div {
                            align-self: center;
                        }

                        .polling_submit_block .options_block ul li>div.iconz,
                        .polling_submit_block .options_block ul li>div.input_block {
                            margin-right: 10px;
                            color: #ccc
                        }

                        .polling_submit_block .options_block ul li>div.input_block input[type=radio] {
                            position: relative;
                            top: 2px;
                            background: var(--pollOptionRadioBg);
                            border: 1px solid var(--pollOptionRadioBorder);
                            width: 1.3em;
                            height: 1.3em;
                        }

                        .polling_submit_block .options_block ul li>div.input_block input[type=radio]:active {
                            background: var(--pollOptionRadioBgActive);
                            border-color: var(--pollOptionRadioBorderActive);
                        }

                        .polling_submit_block .options_block ul li>div.title_block {
                            position: relative;
                            width: 100%;
                            height: 100%;
                            padding: 3px 12px;
                            font-size: 13px;
                            background-color: #fff;
                            border: 1px solid #000;
                            border-radius: 5px;
                            overflow: hidden;
                        }

                        .polling_submit_block .options_block ul li>div span.title {
                            display: inline-block;
                            position: absolute;
                            height: 100%;
                            left: 15px;
                            top: 0;
                            z-index: 2
                        }

                        .polling_submit_block .options_block ul li>div span.progress {
                            display: inline-block;
                            position: absolute;
                            height: 100%;
                            left: 0;
                            top: 0;
                            background-color: skyblue;
                            border-radius: 0px;
                            transition: all 0.4s;
                        }

                        .polling_submit_block .options_block ul li>div.votes {
                            position: absolute;
                            font-size: 13px;
                            right: 10px;
                            z-index: 1
                        }

                        .polling_submit_block .submit_btn {
                            _display: inline-block;
                            padding: 5px 15px;
                            background-color: #2c4b9c;
                            color: #fff;
                            font-size: 14px;
                            line-height: 22px;
                            border-radius: 5px;
                            text-align: center;
                            cursor: pointer;
                        }

                        .cat_summary_block .more_btn {
                            position: absolute;
                            right: 15px;
                            bottom: -5px;
                            font-size: 16px;
                            font-weight: bold;
                        }

                        .cat_summary_block .more_btn>a:hover {
                            color: #006699;
                        }

                        #st-1 .st-btn[data-network='facebook'] {
                            display: inline-block !important;
                        }

                        #st-3 .st-btn[data-network='facebook'] {
                            display: inline-block !important;
                        }

                        .st-total {
                            display: none !important;
                        }

                        .count {
                            background: #2c4b9c;
                            color: #fff;
                            padding: 5px 10px;
                            font-size: 14px;
                            border-radius: 5px;
                        }

                        .polling_submit_block p {
                            font-size: 18px;
                            line-height: 24px;
                            font-weight: bold;
                            margin-top: 10px;
                        }



                        #pollflex.flexslider {
                            margin: 0 !important;
                        }

                        #pollflex .flex-direction-nav a {
                            background: #6666ff;
                            border-radius: 500%;
                            font-size: 0px;
                            width: 35px;
                            height: 35px;
                        }

                        #pollflex .flex-direction-nav a:before {
                            font-family: 'FontAwesome';
                            font-size: 50px;
                            display: inline-block;
                            content: '\f060';
                            color: rgba(255, 255, 255, 0.9);
                            font-size: 24px;
                            padding: 5px;
                        }

                        #pollflex .flex-direction-nav a.flex-next:before {
                            content: '\f061';
                            font-size: 24px;

                            padding: 5px;
                        }

                        #pollflex .poll_block:hover p {
                            color: #000 !important;
                        }

                        .polling_submit_block .sharethis-inline-share-buttons .st-btn {
                            display: inline-block;
                            border-radius: 50% !important;
                            height: 40px !important;
                            width: 40px !important;
                            text-align: center !important;
                            padding: 2px !important;
                        }

                        .polling_submit_block #st-1 .st-btn>img {
                            width: 30px !important;
                            height: 27px !important;
                            top: 4px !important;
                        }

                        #home-online-poll .st-last {
                            display: none !important;
                        }

                        #download-poll ._slides {
                            list-style: none;
                            padding: 10px;
                        }

                        #download-poll .poll_time {
                            margin-bottom: 10px;
                        }

                        .poll-sahare .st-btn[data-network='copy'] {
                            display: none !important;
                        }

                        .poll-coppy .copy-link {
                            background: #14682b !important;
                            color: #fff !important;
                            border-radius: 50% !important;
                            padding: 7px 10px !important;
                        }

                        .poll_block {
                            position: relative;
                        }

                        .success {
                            position: absolute;
                            display: none;
                            bottom: 50px;
                            text-align: center;
                            justify-content: center;
                            width: 100%;
                            z-index: 100000;
                        }

                        .success>span {
                            background-color: #000000aa;
                            font-size: 13px;
                            padding: 0 15px;
                            height: 30px;
                            top: 30px;
                            align-items: center;
                            border-radius: 25px;
                            display: flex;
                            align-items: center;
                            color: #fff;
                            font-family: sans-serif;
                        }
                    </style>
                </div>

                <section id="home-online-poll" class="common-border-box h-100">
                    <div class="menu-link my-2">
                        <a href="<?= get_polls_page_link(); ?>">
                            <span class="home_menu_icon">
                                <img src="<?php echo get_template_directory_uri(); ?>/assets/images/Poll-v2.png">
                            </span>
                        </a>
                        <a href="<?= get_polls_page_link(); ?>">অনলাইন জরিপ</a>

                    </div>

                    <div class="_poll_item_block" id="pollflex">

                        <ul class="slides">
                            <li>
                                <?php get_poll(); ?>
                            </li>
                        </ul>

                    </div>

                    <?php if (isset($codedokan['Pool_ads300x250']) && !empty($codedokan['Pool_ads300x250'])): ?>
                        <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                            <?php echo $codedokan['Pool_ads300x250']; ?>
                        </div>
                    <?php endif; ?>
                </section>


            </div>
            <!-- 202 -->
             <!-- AjpDS -->
                       <div class="col-12 col-md-3">
                <?php if (isset($codedokan['sidebar_ads320x100']) && !empty($codedokan['sidebar_ads320x100'])): ?>
                    <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['sidebar_ads320x100']; ?>
                    </div>
                <?php endif; ?>

                <!-- <div class="common-border-box">
                    <div class="tab_block_stories">
                        <div class="tab_bar_block_stories">
                            <ul>
                                <li class="active" data-id="video">
                                    <img style="width:20px; margin-right: 5px"
                                        src="<?php echo codedokan_ROOT_IMG . '/video-stories.png'; ?>">
                                    <a _href="<?php echo get_post_type_archive_link('videogallery'); ?>">
                                        ভিডিও স্টোরি
                                    </a>
                                </li>

                                <li data-id="photo">
                                    <img style="width:20px; margin-right: 5px"
                                        src="<?php echo codedokan_ROOT_IMG . '/photo-stories.png'; ?>">
                                    <a _href="<?php echo get_post_type_archive_link('photogallery'); ?>">
                                        ফটো স্টোরি
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="tab_block_view_stories">
                            <div data="video-view">
                                <div class="flexslider m-0 border-0" id="videostories">
                                    <ul class="slides">
                                        <?php
                                        $args1 = array(
                                            'post_type' => 'videogallery',
                                            'posts_per_page' => 10,
                                            'order' => 'DESC',
                                        );
                                        $lastpost = new WP_Query($args1);
                                        if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                <li>
                                                    <a href="<?php the_permalink(); ?>">
                                                        <div class="vidstocovr"
                                                            style="background:url(<?php echo get_the_post_thumbnail_url(get_the_ID(), 'custom-size'); ?>);background-size: cover;background-position: center;height:415px">

                                                            <img src="<?php echo codedokan_ROOT_IMG . '/play-button-80X80.png'; ?>"
                                                                class="play-icon" />
                                                        </div>
                                                        <div class="album_name"><?php the_title(); ?></div>
                                                    </a>
                                                </li>
                                        <?php endwhile;
                                            wp_reset_postdata();
                                        endif ?>
                                    </ul>
                                </div>
                            </div>

                            <div data="photo-view">
                                <div class="flexslider m-0 border-0" id="photoStories">
                                    <ul class="slides">
                                        <?php
                                        $args1 = array(
                                            'post_type' => 'photogallery',
                                            'posts_per_page' => 10,
                                            'order' => 'DESC',
                                        );
                                        $lastpost = new WP_Query($args1);
                                        if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                <li>
                                                    <div class="webstories">
                                                        <a href="<?php the_permalink(); ?>" class="font-light">
                                                            <div class="vidstocovr"
                                                                style="background:url(<?php echo get_the_post_thumbnail_url(get_the_ID(), 'custom-size'); ?>);background-size: cover;background-position: center;height:415px">

                                                                <img src="<?php echo codedokan_ROOT_IMG . '/photo-story.png'; ?>"
                                                                    class="photo-icon" />
                                                            </div>
                                                        </a>
                                                        <div class="album_name">
                                                            <a href="<?php the_permalink(); ?>" class="font-light">
                                                                <?php the_title(); ?>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                        <?php endwhile;
                                            wp_reset_postdata();
                                        endif ?>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>
                        .tab_bar_block_stories ul {
                            display: table;
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            margin-bottom: 10px;
                        }

                        .tab_bar_block_stories li {
                            display: table-cell;
                            width: 50%;
                            position: relative;
                            padding-bottom: 5px;
                            border-bottom: 2px solid #ebebeb;
                            bottom: -2px;
                            cursor: pointer;
                        }

                        .tab_bar_block_stories li a {
                            font-size: 17px;
                            font-weight: bold;
                        }

                        .tab_bar_block_stories li.active {
                            border-bottom: 3px solid #c3282d;
                        }

                        .tab_bar_block_stories svg {
                            width: 22px;
                            height: auto;
                            margin-right: 5px;
                        }
                    </style>
                </div>---> 

                <!--<//?php if (isset($codedokan['sidebar_ads300x250']) && !empty($codedokan['sidebar_ads300x250'])): ?>
                                    <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                                        <//?php echo $codedokan['sidebar_ads300x250']; ?>
                                    </div>
                 <//?php endif; ?>-->
            </div>
        </div>
        
    </div>
    <!-- ADS -->
</section>
<section class="bg-white">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-9">
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <style>
                                    .vidicon_right_lead {
                                        style="height: 30px !important;width: auto !important;"
                                    }
                                </style>

                                <div class="home-category-content" id="bodymenu-nolead">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_2']); ?>">
                                            <?php $image_id2 = get_term_meta($codedokan['home_cat_2'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id2) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id2, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_2']); ?></span>
                                        </a>
                                        <a href="special" class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>
                                    </div>
                                    <div class="row">

                                        <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_2'] . ' & posts_per_page=4'); ?>
                                        <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                <div class="col-12 col-md-3 mb-3">
                                                    <div class="d ">
                                                        <div
                                                            class="common-card-content position-relative common-border-box p-0">
                                                            <div class="image-lead position-relative text-center">
                                                                <span class="imgWrep">
                                                                    <?php custom_post_thumbnail(); ?>
                                                                </span>
                                                            </div>
                                                            <div class="selected-news-height p-2   p-2">
                                                                <div class="menu-link ">

                                                                    <a href="special"><span>বাছাইকৃত</span></a>

                                                                </div>
                                                                <h5 class="title">
                                                                    <?php the_title(); ?>
                                                                </h5>
                                                                <div class="summery d-block">
                                                                    <?php custom_length_excerpt(20); ?>
                                                                </div>
                                                            </div>
                                                            <a class="link" href="<?php the_permalink(); ?>"></a>
                                                        </div>
                                                    </div>
                                                </div>
                                        <?php endwhile;
                                            wp_reset_postdata();
                                        endif; ?>

                                    </div>

                                </div>


                                <div class="news-separator-horizontal-border"></div>

                                <!-- ADS -->
                            </div>
                        </div>
                    </div>
                </div>
                <!--Ads-->

                <?php if (isset($codedokan['home_page_section1_728x90']) && !empty($codedokan['home_page_section1_728x90'])): ?>
                    <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['home_page_section1_728x90']; ?>
                    </div>
                <?php endif; ?>

                <!--Ads-->
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="home-category-content" id="bodymenuOnelead">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_3']); ?>">
                                            <?php $image_id3 = get_term_meta($codedokan['home_cat_3'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id3) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id3, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_3']); ?></span>
                                        </a>
                                        <a href="national" class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4 news-separator-vertical-border position-relative"
                                            id="lead-lews">
                                            <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_3'] . ' & posts_per_page=1'); ?>
                                            <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                    <div style="_background: #f0f0f0; height: 100%">
                                                        <div class="common-card-content position-relative ">
                                                            <div class="image-lead position-relative text-center">
                                                                <span class="imgWrep">
                                                                    <?php custom_post_thumbnail(); ?>
                                                                </span>
                                                                <a class="link" href="<?php the_permalink(); ?>"> </a>
                                                            </div>
                                                            <div class="news-content-box">
                                                                <!-- news headline -->
                                                                <div class="position-relative">
                                                                    <h5 class="title"><?php the_title(); ?> </h5>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>
                                                                <!-- news headline -->

                                                                <!-- summery -->
                                                                <div class="summery">
                                                                    <?php custom_length_excerpt(20); ?>
                                                                </div>
                                                                <!-- summery -->

                                                                <!-- news update time -->
                                                                <div class="time py-1 fs-9">
                                                                    <i class="far fa-clock me-1"></i>
                                                                    <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                                                </div>
                                                                <!-- news update time -->

                                                            </div>
                                                        </div>
                                                    </div>
                                            <?php endwhile;
                                                wp_reset_postdata();
                                            endif; ?>

                                        </div>
                                        <div class="col-md-4 news-separator-vertical-border">

                                            <div class="row sub-news">
                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_3'] . ' & posts_per_page=4 & offset=1'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                        <div class="col-lg-12">
                                                            <div class="news-separator-horizontal-border"></div>
                                                            <div class="flex-content position-relative" id="flex-left-image">
                                                                <div class="d-flex">
                                                                    <div class="flex-shrink-0">
                                                                        <a class="_link" href="<?php the_permalink(); ?>">
                                                                            <div
                                                                                class="img-content position-relative text-center">
                                                                                <span class="imgWrep">
                                                                                    <?php custom_post_thumbnail(); ?>
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div class="flex-grow-1">
                                                                        <!-- <h4 class="title"></h4> -->
                                                                        <a class="_link" href="<?php the_permalink(); ?>">
                                                                            <h4 class="title"><?php the_title(); ?></h4>
                                                                        </a>
                                                                        <!-- news update time -->
                                                                        <div class="time py-1 fs-9">
                                                                            <i class="far fa-clock me-1"></i>
                                                                            <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                                                        </div>
                                                                        <!-- news update time -->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="row sub-news">
                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_3'] . ' & posts_per_page=5 & offset=5'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                        <div class="col-lg-12">
                                                            <div class="news-separator-horizontal-border"></div>
                                                            <div class="sub2-lead-content">
                                                                <div class="d-flex">
                                                                    <div class="flex-fill">
                                                                        <h4 class="title">
                                                                            <i class="fas fa-arrow-right"></i>
                                                                            <?php the_title(); ?>
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <div class="clearfix"></div>
                                                                <div class="time py-1 fs-9>">
                                                                    <i class="far fa-clock me-1"></i>
                                                                    <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                                                </div>
                                                                <a class="link" href="<?php the_permalink(); ?>"></a>
                                                            </div>

                                                        </div>

                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="news-separator-horizontal-border"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- ADs -->
                        </div>
                    </div>
                </div>
                <!--Ads-->
                <?php if (isset($codedokan['home_page_section4_728x90']) && !empty($codedokan['home_page_section4_728x90'])): ?>
                    <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['home_page_section4_728x90']; ?>
                    </div>
                <?php endif; ?>

                <!--Ads-->
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="home-category-content" id="bodymenuOnelead_cardNews">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_4']); ?>">
                                            <?php $image_id4 = get_term_meta($codedokan['home_cat_4'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id4) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id4, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_4']); ?></span>
                                        </a>
                                        <a href="<?php echo get_category_link($codedokan['home_cat_4']); ?>"
                                            class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4 news-separator-vertical-border position-relative"
                                            id="lead-lews">
                                            <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_4'] . ' & posts_per_page=1'); ?>
                                            <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                    <div style="_background: #f0f0f0; height: 100%">
                                                        <div class="common-card-content position-relative ">
                                                            <div class="image-lead position-relative text-center">
                                                                <span class="imgWrep">
                                                                    <?php custom_post_thumbnail(); ?>
                                                                </span>
                                                                <a class="link" href="<?php the_permalink(); ?>">
                                                                </a>
                                                            </div>

                                                            <div class="news-content-box">
                                                                <!-- news headline -->
                                                                <div class="position-relative">
                                                                    <h5 class="title"><?php the_title(); ?></h5>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>
                                                                <!-- news headline -->

                                                                <!-- summery -->
                                                                <div class="summery">
                                                                    <?php custom_length_excerpt(20); ?>
                                                                </div>
                                                                <!-- summery -->

                                                                <!-- news update time -->
                                                                <div class="time py-1 fs-9">
                                                                    <i class="far fa-clock me-1"></i>
                                                                    <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                                                </div>
                                                                <!-- news update time -->

                                                            </div>
                                                        </div>
                                                    </div>

                                            <?php endwhile;
                                                wp_reset_postdata();
                                            endif; ?>

                                        </div>
                                        <div class="col-md-8">

                                            <div class="row sub-news">

                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_4'] . ' & posts_per_page=6 & offset=1'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                        <div class="col-lg-4 ">
                                                            <div class="common-card-content position-relative ">
                                                                <div class="image-lead position-relative text-center">
                                                                    <span class="imgWrep">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                    </span>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>
                                                                <div class="news-content-box">
                                                                    <!-- news headline -->
                                                                    <div class="position-relative">
                                                                        <h5 class="title"><?php the_title(); ?></h5>
                                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>

                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="news-separator-horizontal-border"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- ADS -->
                        </div>
                    </div>
                </div>
                <!--Ads-->
                <?php if (isset($codedokan['home_page_section5_728x90']) && !empty($codedokan['home_page_section5_728x90'])): ?>
                    <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['home_page_section5_728x90']; ?>
                    </div>
                <?php endif; ?>
                <!--Ads-->
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <section class="home-category-content" id="bodymenuTwolead">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_5']); ?>">
                                            <?php $image_id5 = get_term_meta($codedokan['home_cat_5'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id5) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id5, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_5']); ?></span>
                                        </a>
                                        <a href="<?php echo get_category_link($codedokan['home_cat_5']); ?>"
                                            class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>

                                    </div>
                                    <div class="">
                                        <div class="row">
                                            <div class="col-lg-8 news-separator-vertical-border" id="lead-news">

                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_5'] . ' & posts_per_page=2'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                        <div class="flex-content position-relative" id="flex-left-image">
                                                            <div class="row">
                                                                <div class="col-12 col-lg-6">
                                                                    <a class="_link" href="<?php the_permalink(); ?>">
                                                                        <div class="img-content position-relative text-center">
                                                                            <span class="imgWrep">
                                                                                <?php custom_post_thumbnail(); ?>
                                                                            </span>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div class="col-12 col-lg-6">
                                                                    <a class="_link" href="<?php the_permalink(); ?>">
                                                                        <h4 class="title"><?php the_title(); ?></h4>
                                                                    </a>
                                                                    <div class="summery">
                                                                        <?php custom_length_excerpt(20); ?>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>

                                            </div>
                                            <div class="col-lg-4">
                                                <div class="sub-news">
                                                    <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_5'] . ' & posts_per_page=3 & offset=2'); ?>
                                                    <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                            <div class="flex-content position-relative" id="flex-right-image">
                                                                <h4 class="title">
                                                                    <a class="_link" href="<?php the_permalink(); ?>">
                                                                        <?php the_title(); ?>
                                                                    </a>
                                                                </h4>
                                                                <div class="d-flex align-items-center">
                                                                    <div class="flex-grow-1">

                                                                        <!-- summery -->
                                                                        <div class="summery d-block">
                                                                            <?php custom_length_excerpt(20); ?>

                                                                        </div>
                                                                        <!-- summery -->

                                                                        <!-- news update time -->
                                                                        <div class="time py-1 fs-9">
                                                                            <i class="far fa-clock me-1"></i>
                                                                            <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                                                        </div>
                                                                        <!-- news update time -->
                                                                    </div>
                                                                    <a class="_link" href="<?php the_permalink(); ?>">
                                                                        <div class="flex-shrink-0">
                                                                            <div
                                                                                class="img-content position-relative text-center">
                                                                                <span class="imgWrep">
                                                                                    <?php custom_post_thumbnail(); ?>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </a>

                                                                </div>

                                                            </div>

                                                    <?php endwhile;
                                                        wp_reset_postdata();
                                                    endif; ?>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <div class="news-separator-horizontal-border"></div>
                            </div>
                            <!-- ADS -->
                        </div>
                    </div>
                </div>


            </div>

            <div class="col-12 col-md-3">
                <div class="text-center mt-3">
                    <?php if (is_active_sidebar('sidebarads3')) : ?>
                        <?php dynamic_sidebar('sidebarads3'); ?>
                    <?php endif; ?>
                </div>

                <div class="text-center mt-3">
                    <?php if (is_active_sidebar('sidebarads4')) : ?>
                        <?php dynamic_sidebar('sidebarads4'); ?>
                    <?php endif; ?>
                </div>
                <!-- ads -->
                <div class="text-center mt-3">
                    <?php if (is_active_sidebar('facebook_like')) : ?>
                        <?php dynamic_sidebar('facebook_like'); ?>
                    <?php endif; ?>
                </div>
                <!-- ADS -->

            </div>
        </div>
        <!--Ads-->

        <?php if (isset($codedokan['home_page_section6_728x90']) && !empty($codedokan['home_page_section6_728x90'])): ?>
            <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                <?php echo $codedokan['home_page_section6_728x90']; ?>
            </div>
        <?php endif; ?>
        <!--Ads-->
        <div class="row">
            <div class="col-12">
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-9">
                                <div class="home-category-content" id="bodymenuCardNews">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_6']); ?>">
                                            <?php $image_id6 = get_term_meta($codedokan['home_cat_6'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id6) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id6, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_6']); ?></span>
                                        </a>
                                        <a href="<?php echo get_category_link($codedokan['home_cat_6']); ?>"
                                            class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>

                                    </div>
                                    <div class="row">

                                        <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_6'] . ' & posts_per_page=8'); ?>
                                        <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                <div class="col-lg-3 ">
                                                    <div class="common-card-content position-relative ">
                                                        <div class="image-lead position-relative text-center">
                                                            <span class="imgWrep">
                                                                <?php custom_post_thumbnail(); ?>
                                                            </span>
                                                            <a class="link" href="<?php the_permalink(); ?>">
                                                            </a>
                                                        </div>

                                                        <div class="news-content-box">
                                                            <div class="position-relative">
                                                                <h5 class="title">
                                                                    <?php the_title(); ?>
                                                                </h5>
                                                                <a class="link" href="<?php the_permalink(); ?>"></a>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                        <?php endwhile;
                                            wp_reset_postdata();
                                        endif; ?>

                                    </div>
                                </div>
                                <div class="news-separator-horizontal-border"></div>
                                <!-- ADS -->
                            </div>
                            <div class="col-lg-3">


                                <div class="map_inner my-3">
                                    <div class="row">

                                        <div class="home-category-content" id="map_title">
                                            <div class="d-flex align-items-center category-name theme-color">
                                                <span class="fw-bold">আমার এলাকার সংবাদ</span>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 col-sm-6 col-md-6">
                                            <form>
                                                <div class="form-group">
                                                    <div class="form_col">
                                                        <select class="form-control" name="bd_division" id="division">
                                                            <option>বিভাগ</option>
                                                            <?php $division_args =   array(
                                                                'taxonomy'     => 'location',
                                                                'orderby'      => 'ID',
                                                                'parent' => 0,
                                                                'hide_empty'    => false
                                                            );
                                                            $divisions = get_terms($division_args);
                                                            foreach ($divisions as $division) : ?>
                                                                <option value="<?php echo $division->term_id; ?>"
                                                                    data-val="<?php echo get_term_link($division->term_id); ?>">
                                                                    <?php echo $division->name; ?></option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                    <div class="form_col">
                                                        <select class="form-control" name="bd_district" id="district">
                                                            <option value="" selected="">জেলা</option>
                                                            <?php $args =   array(
                                                                'taxonomy'     => 'location',
                                                                'orderby'      => 'ID',
                                                                'parent' => 0,
                                                                'hide_empty'    => false
                                                            );
                                                            $terms = get_terms($args);
                                                            foreach ($terms as $term) :
                                                                $d_args =   array(
                                                                    'taxonomy'     => 'location',
                                                                    'parent'        => $term->term_id,
                                                                    'orderby'      => 'ID',
                                                                    'hide_empty'    => false
                                                                );
                                                                $districts = get_terms($d_args);
                                                                foreach ($districts as $district) { ?>
                                                                    <option value="<?php echo $district->term_id; ?>"
                                                                        style="display:none"
                                                                        class="dist-<?php echo $term->term_id; ?>"
                                                                        data-val="<?php echo get_term_link($district->term_id); ?>">
                                                                        <?php echo $district->name; ?></option>
                                                                <?php  } ?>

                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                    <div class="form_col">
                                                        <select class="form-control" name="bd_thana" id="upozilla">

                                                            <option value="" selected="">--উপজেলা--</option>

                                                            <?php $args =   array(
                                                                'taxonomy'     => 'location',
                                                                'orderby'      => 'ID',
                                                                'parent'        => 0,
                                                                'hide_empty'    => false
                                                            );
                                                            $terms = get_terms($args);
                                                            ?>
                                                            <?php foreach ($terms as $term) : //Level 0 

                                                                $d_args =   array(
                                                                    'taxonomy'     => 'location',
                                                                    'parent'        => $term->term_id,
                                                                    'orderby'      => 'ID',
                                                                    'hide_empty'    => false
                                                                );
                                                                $districts = get_terms($d_args);

                                                                foreach ($districts as $district) {  // Level One 

                                                                    $u_args =   array(
                                                                        'taxonomy'     => 'location',
                                                                        'child_of'        => $district->term_id,
                                                                        'orderby'      => 'ID',
                                                                        'hide_empty'    => false
                                                                    );
                                                                    $upozilas = get_terms($u_args);

                                                                    foreach ($upozilas as $upozila) :  // Level One 
                                                            ?>

                                                                        <option id="upo"
                                                                            value="<?php echo get_term_link($upozila->term_id); ?>"
                                                                            style="display:none"
                                                                            class="thana-<?php echo $district->term_id; ?>"
                                                                            data-val="<?php echo get_term_link($upozila->term_id); ?>">
                                                                            <?php echo $upozila->name; ?>
                                                                        </option>
                                                                    <?php endforeach; // Upozilas 
                                                                    ?>

                                                                <?php } // Districts 
                                                                ?>

                                                            <?php endforeach; ?>

                                                        </select>
                                                    </div>
                                                    <div class="form_col">
                                                        <div class="btn btn-danger dist_news_srch w-100">খুঁজুন
                                                            <i class="fa fa-search ml-2"
                                                                style="color: #FFF !important; height: 100%"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <!--<//?php if (isset($codedokan['sidebar_ads300x250']) && !empty($codedokan['sidebar_ads300x250'])): ?>
                                    <div style="min-width: 320px; min-height: 100px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                                        <//?php echo $codedokan['sidebar_ads300x250']; ?>
                                    </div>
                             <//?php endif; ?>-->
                                <!-- ADS -->
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <!--Ads-->
        <?php if (isset($codedokan['home_page_section3_728x90']) && !empty($codedokan['home_page_section3_728x90'])): ?>
            <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                <?php echo $codedokan['home_page_section3_728x90']; ?>
            </div>
        <?php endif; ?>
        <!--Ads-->
        <div class="row">
            <div class="col-12 col-md-9">
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">

                                <div class="home-category-content" id="bodymenu_leadRightimg">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_7']); ?>">
                                            <?php $image_id7 = get_term_meta($codedokan['home_cat_7'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id7) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id7, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_7']); ?></span>
                                        </a>
                                        <a href="<?php echo get_category_link($codedokan['home_cat_7']); ?>"
                                            class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 news-separator-vertical-border position-relative lead-lews"
                                            id="lead-lews">

                                            <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_7'] . ' & posts_per_page=1'); ?>
                                            <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                    <div class="flex-content position-relative mb-3">

                                                        <div class="d-flex mobile_clmn">
                                                            <div class="flex-grow-1">
                                                                <h4 class="title"><?php the_title(); ?></h4>
                                                                <!-- summery -->
                                                                <div class="summery d-block"><?php custom_length_excerpt(20); ?>
                                                                </div>
                                                                <!-- summery -->
                                                            </div>
                                                            <div class="flex-shrink-0">
                                                                <div class="img-content position-relative text-center">
                                                                    <div class="longimg">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                    </div>

                                            <?php endwhile;
                                                wp_reset_postdata();
                                            endif; ?>



                                        </div>
                                        <div class="col-md-6">

                                            <div class="row sub-news">

                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_7'] . ' & posts_per_page=2 & offset=1'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                        <div class="col-lg-6 ">
                                                            <div class="common-card-content position-relative ">
                                                                <div class="image-lead position-relative text-center">
                                                                    <span class="imgWrep">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                    </span>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>
                                                                <div class="news-content-box">
                                                                    <!-- news headline -->
                                                                    <div class="position-relative">
                                                                        <h5 class="title"><?php the_title(); ?></h5>
                                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                    </div>
                                                                    <!-- news headline -->
                                                                </div>
                                                            </div>
                                                        </div>

                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>

                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="news-separator-horizontal-border"></div>
                                        </div>
                                    </div>
                                    <div class="row subMore-news">

                                        <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_7'] . ' & posts_per_page=4 & offset=3'); ?>
                                        <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                <div class="col-lg-3 ">
                                                    <div class="common-card-content position-relative ">
                                                        <div class="image-lead position-relative text-center">
                                                            <span class="imgWrep">
                                                                <?php custom_post_thumbnail(); ?>
                                                            </span>
                                                            <a class="link" href="<?php the_permalink(); ?>">
                                                            </a>
                                                        </div>
                                                        <div class="news-content-box">
                                                            <!-- news headline -->
                                                            <div class="position-relative">
                                                                <h5 class="title"><?php the_title(); ?></h5>
                                                                <a class="link" href="<?php the_permalink(); ?>"></a>
                                                            </div>
                                                            <!-- news headline -->
                                                        </div>
                                                    </div>
                                                </div>

                                        <?php endwhile;
                                            wp_reset_postdata();
                                        endif; ?>

                                    </div>
                                </div>
                                <div class="news-separator-horizontal-border"></div>
                            </div>
                            <!-- ADS -->
                        </div>
                    </div>
                </div>
                <!--Ads-->
                <?php if (isset($codedokan['home_page_section2_728x90']) && !empty($codedokan['home_page_section2_728x90'])): ?>
                    <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                        <?php echo $codedokan['home_page_section2_728x90']; ?>
                    </div>
                <?php endif; ?>
                <!--Ads-->
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="home-category-content" id="bodymenu_threeLead">
                                    <div class="bodymenu-link">

                                        <a href="<?php echo get_category_link($codedokan['home_cat_8']); ?>">
                                            <?php $image_id8 = get_term_meta($codedokan['home_cat_8'], 'showcase-taxonomy-image-id', true); ?>
                                            <?php if ($image_id8) { ?>
                                                <img
                                                    src="<?php echo wp_get_attachment_image_url($image_id8, 'full', true); ?>">
                                            <?php } ?>
                                            <span><?php echo get_the_category_by_id($codedokan['home_cat_8']); ?></span>
                                        </a>
                                        <a href="<?php echo get_category_link($codedokan['home_cat_8']); ?>"
                                            class="float-end">
                                            <div><i class="fas fa-arrow-right"></i></div>
                                        </a>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">

                                            <div class="_lead-news">
                                                <div class="row">

                                                    <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_8'] . ' & posts_per_page=3'); ?>
                                                    <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                            <div class="col-lg-4 ">
                                                                <div class="common-card-content position-relative ">
                                                                    <div class="image-lead position-relative text-center">
                                                                        <span class="imgWrep">
                                                                            <?php custom_post_thumbnail(); ?>
                                                                        </span>
                                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                    </div>
                                                                    <div class="news-content-box">
                                                                        <div class="position-relative">
                                                                            <h5 class="title"><?php the_title(); ?></h5>
                                                                            <a class="link"
                                                                                href="<?php the_permalink(); ?>"></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                    <?php endwhile;
                                                        wp_reset_postdata();
                                                    endif; ?>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="news-separator-horizontal-border"></div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="row sub-news">

                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_8'] . ' & posts_per_page=4 & offset=3'); ?>
                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                        <div class="col-lg-3 ">
                                                            <div class="common-card-content position-relative ">
                                                                <div class="image-lead position-relative text-center">
                                                                    <span class="imgWrep">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                    </span>
                                                                    <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                </div>
                                                                <div class="news-content-box">
                                                                    <div class="position-relative">
                                                                        <h5 class="title"> <?php the_title(); ?> </h5>
                                                                        <a class="link" href="<?php the_permalink(); ?>"></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif; ?>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="news-separator-horizontal-border"></div>
                            </div>
                            <!-- ADS -->
                        </div>
                    </div>
                </div>


            </div>
            <div class="col-12 col-md-3">

                <div class="text-center mt-3">
                    <?php if (is_active_sidebar('epaper_ad')) : ?>
                        <?php dynamic_sidebar('epaper_ad'); ?>
                    <?php endif; ?>
                </div>

                <div class="text-center mt-3">
                    <?php if (is_active_sidebar('calender_archive_widget')) : ?>
                        <?php dynamic_sidebar('calender_archive_widget'); ?>
                    <?php endif; ?>
                </div>

            </div>
        </div>
        <!--Ads-->
        <?php if (isset($codedokan['home_page_section7_728x90']) && !empty($codedokan['home_page_section7_728x90'])): ?>
            <div style="min-width: 320px; min-height: 50px; border: 0px; padding: 0; overflow: hidden; background-color: transparent; text-align: center !important;">
                <?php echo $codedokan['home_page_section7_728x90']; ?>
            </div>
        <?php endif; ?>
        <!--Ads-->
        <div class="row">
            <div class="col-12">
                <div class="bg-white">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <section id="sports-news">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="_news-border">
                                                <div class="bodymenu-link">

                                                    <a
                                                        href="<?php echo get_category_link($codedokan['home_cat_9']); ?>">
                                                        <?php $image_id9 = get_term_meta($codedokan['home_cat_9'], 'showcase-taxonomy-image-id', true); ?>
                                                        <?php if ($image_id9) { ?>
                                                            <img
                                                                src="<?php echo wp_get_attachment_image_url($image_id9, 'full', true); ?>">
                                                        <?php } ?>
                                                        <span><?php echo get_the_category_by_id($codedokan['home_cat_9']); ?></span>
                                                    </a>
                                                    <a href="<?php echo get_category_link($codedokan['home_cat_9']); ?>"
                                                        class="float-end">
                                                        <div><i class="fas fa-arrow-right"></i></div>
                                                    </a>

                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md-9">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="row sub-news">

                                                                    <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_9'] . ' & posts_per_page=2'); ?>
                                                                    <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                                            <div
                                                                                class="col-lg-12  news-separator-vertical-border">
                                                                                <div
                                                                                    class="common-card-content position-relative ">
                                                                                    <div
                                                                                        class="image-lead position-relative text-center">
                                                                                        <span class="imgWrep">
                                                                                            <?php custom_post_thumbnail(); ?>
                                                                                        </span>
                                                                                        <a class="link"
                                                                                            href="<?php the_permalink(); ?>"></a>
                                                                                    </div>
                                                                                    <div class="news-content-box">
                                                                                        <!-- news headline -->
                                                                                        <div class="position-relative">
                                                                                            <h5 class="title">
                                                                                                <?php the_title(); ?></h5>
                                                                                            <a class="link"
                                                                                                href="<?php the_permalink(); ?>"></a>
                                                                                        </div>
                                                                                        <!-- news headline -->

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                    <?php endwhile;
                                                                        wp_reset_postdata();
                                                                    endif; ?>

                                                                </div>
                                                            </div>

                                                            <div
                                                                class="col-md-6 news-separator-vertical-border position-relative lead-news">
                                                                <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_9'] . ' & posts_per_page=1 & offset=2'); ?>
                                                                <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                                        <div class="common-card-content position-relative ">
                                                                            <div
                                                                                class="image-lead position-relative text-center">
                                                                                <span class="imgWrep">
                                                                                    <?php custom_post_thumbnail(); ?>
                                                                                </span>
                                                                                <a class="link"
                                                                                    href="<?php the_permalink(); ?>"></a>
                                                                            </div>
                                                                            <div class="news-content-box">
                                                                                <!-- news headline -->
                                                                                <div class="position-relative">
                                                                                    <h5 class="title"><?php the_title(); ?></h5>
                                                                                    <a class="link"
                                                                                        href="<?php the_permalink(); ?>"></a>
                                                                                </div>

                                                                                <div class="summery">
                                                                                    <?php custom_length_excerpt(30); ?>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                <?php endwhile;
                                                                    wp_reset_postdata();
                                                                endif; ?>
                                                            </div>

                                                            <div class="col-md-3">
                                                                <div class="row sub-news">
                                                                    <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_9'] . ' & posts_per_page=2 & offset=3'); ?>
                                                                    <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                                                            <div
                                                                                class="col-lg-12  news-separator-vertical-border">
                                                                                <div
                                                                                    class="common-card-content position-relative ">
                                                                                    <div
                                                                                        class="image-lead position-relative text-center">
                                                                                        <span class="imgWrep">
                                                                                            <?php custom_post_thumbnail(); ?>
                                                                                        </span>
                                                                                        <a class="link"
                                                                                            href="<?php the_permalink(); ?>"></a>
                                                                                    </div>
                                                                                    <div class="news-content-box">
                                                                                        <!-- news headline -->
                                                                                        <div class="position-relative">
                                                                                            <h5 class="title">
                                                                                                <?php the_title(); ?></h5>
                                                                                            <a class="link"
                                                                                                href="<?php the_permalink(); ?>"></a>
                                                                                        </div>
                                                                                        <!-- news headline -->

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                    <?php endwhile;
                                                                        wp_reset_postdata();
                                                                    endif; ?>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="border my-1"></div>
                                                    </div>

                                                    <?php $subcategories = get_categories(array('parent' => $codedokan['home_cat_9'])); ?>

                                                    <div class="col-12 col-md-3">
                                                        <?php if ($subcategories) { ?>
                                                            <div class="sports-upcoming">
                                                                <div><span class="mx-3">ইভেন্ট</span></div>
                                                                <div class="upcoming-scroll">

                                                                    <?php foreach ($subcategories as $subcategory) { ?>

                                                                        <div
                                                                            class="d-flex align-items-center position-relative">
                                                                            <div class="flex-shrink-0">
                                                                                <i class="fas fa-arrow-right ms-2"></i>
                                                                            </div>
                                                                            <div class="flex-grow-1 ms-2">
                                                                                <h5 class="title">
                                                                                    <?php echo $subcategory->name; ?></h5>
                                                                            </div>
                                                                            <a class="link"
                                                                                href="<?php echo get_category_link($subcategory->term_id); ?>"></a>
                                                                        </div>

                                                                    <?php } ?>

                                                                </div>
                                                            </div>
                                                        <?php } ?>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </section>


                                <div class="news-separator-horizontal-border"></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    </div>

</section>
<?php $args1 = array(
    'post_type' => 'videogallery',
    'posts_per_page' => 20,
    'order' => 'DESC',
);
$videoPosts = new WP_Query($args1);
if ($videoPosts->have_posts()) : ?>

    <section class="bg-white mt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="common-border-box h-100">

                        <section id="video-gallery">

                            <div class=" d-flex justify-content-between pb-2">
                                <div class="title">
                                    <img style="width:20px; margin-right: 18px;margin-top: -5px;"
                                        src="<?php echo codedokan_ROOT_IMG . '/video-stories.png'; ?>">
                                    <a href="<?php echo get_post_type_archive_link('videogallery'); ?>">ভিডিও </a>
                                </div>
                                <div class="more">
                                    <a href="<?php echo get_post_type_archive_link('videogallery'); ?>">সব ভিডিও
                                        <i class="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="flexslider" id="videoFlex">
                                <ul class="slides">

                                    <?php while ($videoPosts->have_posts()) : $videoPosts->the_post(); ?>
                                        <li class="video mb-3 position-relative">
                                            <a href="<?php the_permalink(); ?>">
                                                <div class="text-center vid-single position-relative">
                                                    <?php custom_post_thumbnail(); ?>
                                                    <i class="fas fa-play-circle"></i>
                                                </div>
                                                <h5 class="font-20 heading-h2 pt-2 pb-2 text-black">
                                                    <?php the_title(); ?>
                                                </h5>
                                            </a>
                                            <div class="time">
                                                <i class="far fa-clock me-1"></i>
                                                <?php echo bn1_date(get_the_time('j F, Y')); ?>
                                            </div>
                                        </li>
                                    <?php endwhile; ?>

                                </ul>
                            </div>
                        </section>

                    </div>
                </div>
                <!-- ADS -->
            </div>
        </div>
    </section>
<?php endif; ?>
<section class="gallery">

    <section class="bottom-gap-40" id="photo-gallery">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="">
                        <div class="menu-link">
                            <a href="<?php echo get_post_type_archive_link('photogallery'); ?>">
                                <i class="fas fa-images"></i>
                                <span>ফটোগ্যালারি</span>
                            </a>
                            <span class="menu-link-border-middle-full"></span>
                        </div>

                        <div class="row">
                            <div class="col-12 col-md-9 news-separator-vertical-border">
                                <div class="lead-album">
                                    <div class="position-relative">

                                        <div id="home-lead-album" class="home-lead-album">
                                            <ul class="slides">

                                                <?php $args1 = array(
                                                    'post_type' => 'photogallery',
                                                    'posts_per_page' => 6,
                                                    'order' => 'DESC',
                                                );
                                                $lastpost = new WP_Query($args1);
                                                if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>
                                                        <li
                                                            data-thumb="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'custom-size'); ?>">
                                                            <div class="sub2-lead-content">
                                                                <div class="img-content position-relative text-center">
                                                                    <span class="imgWrep">
                                                                        <?php custom_post_thumbnail(); ?>
                                                                        <i
                                                                            class="fas fa-images position-absolute end-0 bottom-0 text-white p-1 fs-4"></i>
                                                                    </span>
                                                                </div>
                                                                <div class="flex-grow-1">
                                                                    <h4 class="title overlay-headline">
                                                                        <?php the_title(); ?>
                                                                    </h4>
                                                                </div>

                                                                <a class="link" href="<?php the_permalink(); ?>"></a>

                                                                <div class="photo_social_link">
                                                                    <a target="_blank"
                                                                        href="https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>">
                                                                        <i class="fab fa-facebook-f"></i>
                                                                    </a>

                                                                    <a target="_blank"
                                                                        href="https://www.instagram.com/?url=<?php the_permalink(); ?>">
                                                                        <i class="fab fa-instagram"></i>
                                                                    </a>

                                                                    <a target="_blank"
                                                                        href="https://www.twitter.com/share?url=<?php the_permalink(); ?>">
                                                                        <i class="fab fa-twitter"></i>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                            <div class="home-lead-album-share">
                                                                <div class="photo-gallery-share">

                                                                    <span class="photo-gallery-share-but">
                                                                        <div class="photo-gallery-share-view">
                                                                            <a target="_blank" class="facebook-f"
                                                                                href="https://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>">
                                                                                <i class="fab fa-facebook-f"></i>
                                                                            </a>

                                                                            <a target="_blank" class="instagram"
                                                                                href="https://www.instagram.com/?url=<?php the_permalink(); ?>">
                                                                            </a>

                                                                            <a target="_blank" class="twitter"
                                                                                href="https://www.twitter.com/share?url=<?php the_permalink(); ?>">
                                                                                <i class="fab fa-twitter"></i>
                                                                            </a>

                                                                        </div>

                                                                        <span class="photo-gallery-share-icon">

                                                                            <i class="fas fa-share-alt me-2"></i>
                                                                            Share

                                                                        </span>

                                                                    </span>

                                                                </div>
                                                            </div>



                                                        </li>
                                                <?php endwhile;
                                                    wp_reset_postdata();
                                                endif ?>

                                            </ul>
                                        </div>


                                    </div>
                                </div>

                            </div>
                            <div class="col-12 col-md-3">
                                <div class="other-album-list">
                                    <?php $args1 = array(
                                        'post_type' => 'photogallery',
                                        'posts_per_page' => 16,
                                        'order' => 'DESC',
                                    );
                                    $lastpost = new WP_Query($args1);
                                    if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                            <a href="<?php the_permalink(); ?>" class="sub2-lead-content mb-3 home-photo-album">
                                                <div class="img-content position-relative text-center">
                                                    <span class="imgWrep">
                                                        <?php custom_post_thumbnail(); ?>
                                                        <i
                                                            class="fas fa-images position-absolute end-0 bottom-0 text-white p-1 fs-4"></i>
                                                    </span>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <h4 class="title overlay-headline"><?php the_title(); ?></h4>
                                                </div>
                                            </a>

                                    <?php endwhile;
                                        wp_reset_postdata();
                                    endif ?>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


</section>

<section class="podcast">
    <section id="podcast" class="my-2 py-1">
        <div class="container-fluid">
            <div class="news-border">
                <div class="menu-link mb-2 bodymenu-link">
                    <a href="<?php echo get_category_link($codedokan['home_cat_10']); ?>">
                                           <?php 
                                        $image_id = get_term_meta($codedokan['home_cat_10'], 'showcase-taxonomy-image-id', true);
                                        if ($image_id) {
                                            echo '<img src="' . wp_get_attachment_image_url($image_id, 'full', true) . '" alt="Category Image">';
                                        }
                                        ?>


                        <span><?php echo get_the_category_by_id($codedokan['home_cat_10']); ?></span>
                    </a>

                </div>

                <div class="flexslider carousel border-0 m-0" id="podcastFlex">
                    <ul class="slides">
                        <?php $lastpost = new WP_Query('cat=' . $codedokan['home_cat_10'] . ' & posts_per_page=20'); ?>
                        <?php if ($lastpost->have_posts()) : while ($lastpost->have_posts()) : $lastpost->the_post(); ?>

                                <li class="p-2 border rounded">
                                    <div class="flex-content">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0">
                                                <a href="<?php the_permalink(); ?>">
                                                    <div class="img-content position-relative text-center">
                                                        <span class="imgWrep">
                                                            <?php custom_post_thumbnail(); ?>
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>

                                            <div class="flex-grow-1">
    <a href="<?php the_permalink(); ?>">
        <h4 class="title"><?php echo wp_trim_words(get_the_title(), 5, '...'); ?></h4>
        <div class="time py-1 fs-9">
            <i class="far fa-clock me-1"></i>
            <?php echo bn1_date(get_the_time('j F, Y')); ?>
        </div>
    </a>
</div>


                                        </div>

                                    </div>
                                </li>

                        <?php endwhile;
                            wp_reset_postdata();
                        endif; ?>


                    </ul>
                </div>
            </div>
        </div>
    </section>
</section>


<?php get_footer(); ?>