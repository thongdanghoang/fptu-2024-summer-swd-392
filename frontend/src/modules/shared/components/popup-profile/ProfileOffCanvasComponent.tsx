import {ReactElement} from 'react';
import {UserDto} from '../../models/userDto.ts';

interface PopupProfileProps {
  currentUser: UserDto | null;
}

export default function ProfileOffCanvasComponent({
  currentUser
}: PopupProfileProps): ReactElement {
  return (
    <div
      className="popup-profile offcanvas offcanvas-end"
      tabIndex={-1}
      id="popup-profile"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header p-4 m-0 gap-3 flex-column align-items-baseline">
        <div className="reviewer d-flex gap-4">
          <div className="avatar">
            <img
              className="avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
            />
          </div>
          <div className="info">
            <div className="full-name semibold-20">
              {currentUser?.firstName} {currentUser?.lastName}
            </div>
            <div className="rating d-flex gap-3">
              <div className="rate-point semibold-16">5.0</div>
              <div className="stars d-flex gap-1">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <i className="bi bi-star"></i>
              </div>
              <div className="number-of-rates regular-14">(10)</div>
            </div>
          </div>
        </div>
        <div className="follow d-flex justify-content-between">
          <div className="following regular-14">12 đang theo dõi</div>
          <div className="followers regular-14">12 người theo dõi</div>
        </div>
      </div>
      <div className="offcanvas-body">
        <div className="list-features"></div>
      </div>
    </div>
  );
}
