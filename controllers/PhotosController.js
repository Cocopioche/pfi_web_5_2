import Authorizations from '../authorizations.js';
import Repository from '../models/repository.js';
import PhotoModel from '../models/photo.js';
import PhotoLikeModel from '../models/photoLike.js';
import Controller from './Controller.js';
import {nowInSeconds} from "../utilities.js";
import TokenManager from "../tokensManager.js";

export default class Photos extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new PhotoModel()), Authorizations.user());
        //this.photoLikesRepository = new Repository(new PhotoLikeModel());
    }
    like(photo) {
        let userId = this.HttpContext.path.params.userId;
        //let photoId = this.HttpContext.path.params.photoId;
        console.log(photo);

        if (userId && photo) {
            let photo = this.repository.findByField("Title", photo.Title);
            console.log(photo);

            if (photo.Likes.includes(userId)) {
                // User has liked the photo before, so unlike it
                photo.Likes = photo.Likes.filter(id => id !== userId);
                this.HttpContext.response.accepted("Photo unliked successfully.");
            } else {
                // User hasn't liked the photo before, so like it
                photo.Likes.push(userId);
                this.HttpContext.response.accepted("Photo liked successfully.");
            }
        } else {
            this.HttpContext.response.badRequest("UserId or PhotoId is not specified.");
        }
    }
    post(data) {
        data["Date"] = nowInSeconds()
        super.post(data);
    }
}