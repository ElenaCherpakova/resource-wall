 <div class="commentSection">
            <textarea
              class="form-control"
              placeholder="Leave your comments"
              id="commentsText"
              rows="4"
              style="background: #fff"
            ></textarea>
            <label class="form-label" for="commentsText"></label>
            <div class="float p-2">
              <button type="button" id="post-comment" class="btn btn-primary btn-sm" resource_id = "<%=resources[resource].id %>">
                Post comment
              </button>
              <button type="button" class="btn btn-outline-primary btn-sm">
                Cancel
              </button>
            </div>
          </div>



                <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                  <div class="d-flex flex-start w-100">

                    <div class="form-outline w-100">
                      <textarea
                        class="form-control"
                        id="textAreaExample"
                        rows="4"
                        style="background: #fff;"
                      ></textarea>
                      <label class="form-label" for="textAreaExample">Message</label>
                    </div>
                  </div>
                  <div class="float-end mt-2 pt-1">
                    <button type="button" class="btn btn-primary btn-sm">Post comment</button>
                    <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                  </div>
                </div>
