import React, { useState, useEffect } from "react";
import { IBlog } from "../../interfaces/BlogInterface";
import { getBlogs } from "../../api/BlogAction";
import Slider from "react-owl-carousel";
import { Card } from "../../components";
import { CARD_TYPE_BLOG, SLIDER_RESPONSIVE_BREAKPOINTS } from '../../constants';

const BlogSection: React.FC = () => {
  let slider: any;
  let keyboardCode: number;
  const [blogList, setBlogList] = useState<IBlog>();

  // Fetch all the blog items 
  useEffect(() => {
    getBlogs()
      .then((data) => {
        console.log(data.data);
        
        setBlogList(data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const slideNext = () => {
    slider.next(500);
  }

  const slidePrev = () => {
    slider.prev(500);
  }

  const slideNextKeyBoard = (event: any) => {
    keyboardCode = event.keyCode;

    if (keyboardCode === 39) {
      slideNext();
    }
  }

  const slidePrevKeyBoard = (event: any) => {
    keyboardCode = event.keyCode;

    if (keyboardCode === 37) {
      slidePrev();
    }
  }

  return (
    <div className="container section-padding">
      <h2 className="item-header">Blogs</h2>
      <div className="item-navigation">
        <div className="view-more-text">View More</div>
        <div
          onClick={slidePrev}
          onKeyDown={slidePrevKeyBoard}
          role="button"
          tabIndex={0}
          className="mr-2"
        >
          <i className="far fa-arrow-alt-circle-left fa-lg nav-icon" />
        </div>
        &nbsp;
        <div
          onClick={slideNext}
          onKeyDown={slideNextKeyBoard}
          role="button"
          tabIndex={0}
        >
          <i className="far fa-arrow-alt-circle-right fa-lg nav-icon" />
        </div>
      </div>

      {blogList && blogList.items && blogList.items.length > 0 &&
      (
        <Slider
          className="owl-theme"
          dots={false}
          loop={true}
          margin={70}
          responsive={SLIDER_RESPONSIVE_BREAKPOINTS}
          ref={(slide) => {
            slider = slide;
          }}
        >
          {blogList.items.map((blog, index) => (
            <Card 
              key={index}
              id={index}
              title={blog.title}
              type={CARD_TYPE_BLOG}
              imageUrl={blog.thumbnail}
              author={blog.author}
              link={blog.link}
              dateTime={blog.pubDate}
              tags={blog.categories}
            />
          ))}
        </Slider>
      )}
    </div> 
  );
};

export default BlogSection;
