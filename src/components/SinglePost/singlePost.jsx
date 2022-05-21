import React from "react";
import "./singlePost.css";
function SinglePost() {
  const user = true;
  return (
    <div className="singlePostContainer">
      <img
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt="postPicture"
      />
      <h1 className="singlePostTitleContainer">
        This is the post singlePostTitle
        <div className="singlePostEditOptions">
          <i class="postEditIcon fa-solid fa-pen-nib"></i>
          <i class="postEditIcon fa-solid fa-trash"></i>
        </div>
      </h1>
      <div className="singlePostCategoryContainer">
        <span>Category: </span>

        {user ? (
          <form className="singlePostCategorySelection">
            <label className="singlePostCatLabel" htmlFor="musicCatg">
              <input
                type="checkbox"
                id="musicCatg"
                name="music"
                value="Music"
              />
              Music
              <span className="checkmark"></span>
            </label>

            <label className="singlePostCatLabel" htmlFor="lifeCatg">
              <input type="checkbox" id="lifeCatg" name="life" value="Life" />
              Life
              <span className="checkmark"></span>
            </label>

            <label className="singlePostCatLabel" htmlFor="animalCatg">
              {" "}
              <input
                type="checkbox"
                id="animalCatg"
                name="animal"
                value="Animal"
              />
              Animal
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="scienceCatg">
              {" "}
              <input
                type="checkbox"
                id="scienceCatg"
                name="science"
                value="Science"
              />
              Science
              <span className="checkmark"></span>
            </label>
            <label className="singlePostCatLabel" htmlFor="technoCatg">
              {" "}
              <input
                type="checkbox"
                id="technoCatg"
                name="technology"
                value="Technology"
              />
              Technology
              <span className="checkmark"></span>
            </label>
          </form>
        ) : (
          "#music"
        )}
      </div>
      <div className="singlePostInfo">
        <span className="singlePostAuthor">
          Author: <b>Iqbal</b>{" "}
        </span>
        <span>Date: 4 days ago</span>
      </div>
      <p className="singlePostDescription">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
        quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
        Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi eos!
      </p>
    </div>
  );
}

export default SinglePost;
