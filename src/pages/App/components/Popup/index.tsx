import { IPopupProps } from "@/types";

export default function Popup({messageToRender, description} : IPopupProps) {
  return (
    <div className={"pop-up" + (messageToRender ? " " + "open" : "" )}>
        {messageToRender}
        {
          description && <p className={"pop-up_description"}>{description}</p>
        }
    </div>
  )
}
