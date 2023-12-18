import Authorizations from '../authorizations.js';
import Repository from '../models/repository.js';
import PhotoModel from '../models/photo.js';
import PhotoLikeModel from '../models/photoLike.js';
import Controller from './Controller.js';
import {nowInSeconds} from "../utilities.js";
import TokenManager from "../tokensManager.js";
import CachedRequests from "../CachedRequestsManager.js";

export default class PhotoLikeController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new PhotoLikeModel()), Authorizations.user());
        this.photoLikesRepository = new Repository(new PhotoLikeModel());
    }
    like(Horhor) {
        let userId = Horhor.userId;
        let photoId = Horhor.photoId;


        if (userId && photoId) {
            let likeId = photoId+userId
            let photoLike = this.photoLikesRepository.findByField("LikeId",  likeId)


            if (photoLike) {
                this.photoLikesRepository.remove(photoLike.Id);
                this.HttpContext.response.accepted("Photo unliked successfully.");

            } else {
                this.photoLikesRepository.add({ PhotoId: photoId, UserId: userId, LikeId: likeId });
                photoLike = this.photoLikesRepository.findByField("LikeId",  likeId);
                this.HttpContext.response.accepted("Photo liked successfully.");
            }
            this.photoLikesRepository.update(photoLike.Id, photoLike);

            this.HttpContext.response.updated(photoLike);
            this.repository.update(photoLike.Id, photoLike);

            this.HttpContext.response.updated(photoLike);
        } else {
            this.HttpContext.response.badRequest("UserId or PhotoId is not specified.");
        }
    }
    post(Horhor) {
        let userId = Horhor.userId;
        let photoId = Horhor.photoId;


        if (userId && photoId) {
            let likeId = photoId+userId
            let photoLike = this.photoLikesRepository.findByField("LikeId",  likeId)


            if (photoLike) {
                this.photoLikesRepository.remove(photoLike.Id);
                this.HttpContext.response.accepted("Photo unliked successfully.");
            } else {
                this.photoLikesRepository.add({ PhotoId: photoId, UserId: userId, LikeId: likeId });
                this.HttpContext.response.accepted("Photo liked successfully.");
            }
        } else {
            this.HttpContext.response.badRequest("UserId or PhotoId is not specified.");
        }
        CachedRequests.clearBypass();
    }

}