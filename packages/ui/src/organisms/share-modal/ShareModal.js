import React from 'react'
import { MyModal } from '../Modal/modal'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineCopy } from 'react-icons/ai'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  RedditShareButton,
  RedditIcon,
  LineShareButton,
  LineIcon,
} from 'react-share'
import { SeoMeta } from '../../../../../apps/client/helper/services/SeoMeta'

const ShareModal = ({
  showModal,
  onClose,
  shareUrl,
  title,
  image,
  description,
}) => {
  return (
    <MyModal show={showModal} onClose={onClose}>
      <SeoMeta title={title} description={description} img={image} />

      <div className="flex flex-col gap-4">
        <div className="absolute right-[10px] top-[5px]">
          <RxCross2
            className="text-lg cursor-pointer hover:bg-primary hover:bg-opacity-20 hover:text-primary duration-200 rounded-full"
            onClick={onClose}
          />
        </div>

        <div className="text-black text-center">{title}</div>

        <div className="bg-gray-200 bg-opacity-20 p-2 flex justify-between items-center rounded-lg">
          <span className="w-11/12 text-black text-[15px] overflow-hidden">
            {shareUrl}
          </span>
          <span
            className="bg-white p-2 rounded-lg cursor-pointer active:scale-110"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl)
            }}
          >
            <AiOutlineCopy className="text-primary text-md" />
          </span>
        </div>

        <div className="rounded-lg gap-4 grid grid-cols-4 place-items-center">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            hashtag="#camformant"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="Check out this awesome website!"
          >
            <EmailIcon size={40} round />
          </EmailShareButton>

          <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={40} round />
          </RedditShareButton>

          <LineShareButton url={shareUrl} title={title}>
            <LineIcon size={40} round />
          </LineShareButton>
        </div>
      </div>
    </MyModal>
  )
}

export default ShareModal
