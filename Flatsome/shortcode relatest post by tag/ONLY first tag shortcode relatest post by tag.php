<?php
/*
 * Lấy bài viết liên quan theo tag trước và sau bài viết hiện tại
*/
function devvn_bvlq() {
    global $post;
    $tags = wp_get_post_tags($post->ID);
    if ($tags){

        $first_tag = $tags[0]->term_id;

        $before_date_ids = $after_date_ids = array();

        $before_date = get_posts(array(
            'post_type'      => 'post',
            'tag__in'        => array($first_tag),
            'post__not_in'   => array($post->ID),
            'posts_per_page' => 2,
            'order'          => 'DESC',
            'date_query'     => array(
                array(
                    'before'    => get_the_date('Y-m-d H:i:s', $post->ID),
                ),
            ),
        ));
        if($before_date && !is_wp_error($before_date)){
            $before_date_ids = wp_list_pluck($before_date, 'ID');
        }

        $after_date = get_posts(array(
            'post_type'      => 'post',
            'tag__in'        => array($first_tag),
            'post__not_in'   => array($post->ID),
            'posts_per_page' => 1,
            'order'          => 'ASC',
            'date_query'     => array(
                array(
                    'after'    => get_the_date('Y-m-d H:i:s', $post->ID),
                ),
            ),
        ));
        if($after_date && !is_wp_error($after_date)){
            $after_date_ids = wp_list_pluck($after_date, 'ID');
        }

        if(!$after_date_ids && !$before_date_ids) return false;

        $output = '<div class="relatedcat"><p>Bài viết liên quan:</p>';

        $ids = implode(',', array_merge($after_date_ids, $before_date_ids));

        $output .= '<div class="devvn_cat_tv">';
        $output .= do_shortcode('[blog_posts style="normal" type="row" columns="3" columns__md="1" show_date="false" comments="false" image_height="56.25%" image_hover="zoom" ids="' . $ids . '"]');
        $output .= '</div>';
        $output .= '</div>';
        return $output;
    }
    else return;
}
add_shortcode('bvlq', 'devvn_bvlq');
