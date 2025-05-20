import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (signatureDataUrl: string) => void;
}

export default function SignatureModal({ open, onClose, onSave }: Props) {
  const sigRef = useRef<SignatureCanvas | null>(null);
 const [isSigning, setIsSigning] = useState(false);
  if (!open) return null;

  const handleSave = () => {
        if (!sigRef.current) {
      alert("Signature pad not initialized.");
      return;
    }

    if (sigRef.current.isEmpty()) {
      alert("Please draw your signature first.");
      return;
    }
    try {
  const canvas = sigRef.current.getCanvas();
  const originalCtx = canvas.getContext("2d");

  if (!originalCtx) return;

  const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  let top = height;
  let bottom = 0;
  let left = width;
  let right = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 0) {
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
    }
  }

  const padding = 10;
  top = Math.max(0, top - padding);
  bottom = Math.min(height, bottom + padding);
  left = Math.max(0, left - padding);
  right = Math.min(width, right + padding);

  const trimmedCanvas = document.createElement("canvas");
  const trimmedCtx = trimmedCanvas.getContext("2d");

  trimmedCanvas.width = right - left;
  trimmedCanvas.height = bottom - top;

  if (!trimmedCtx) return;

  trimmedCtx.drawImage(
    canvas,
    left, top, right - left, bottom - top,
    0, 0, right - left, bottom - top
  );

  const dataUrl = trimmedCanvas.toDataURL("image/png");

  const img = new Image();
  img.onload = () => {
    onSave(dataUrl);
    onClose();
  };
  img.onerror = () => {
    throw new Error("Invalid image data");
  };
  img.src = dataUrl;

} catch (error) {
  console.error("Error saving signature:", error);
  alert("Error saving signature. Please try again.");
}

  };
 const handleStartSigning = () => {
    setIsSigning(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded shadow-lg space-y-4 w-full max-w-md">
        <h3 className="text-lg font-medium">Sign below</h3>
        <div 
          className="border border-gray-300 rounded bg-white"
          onMouseDown={handleStartSigning}
          onTouchStart={handleStartSigning}
        >
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              width: 400,
              height: 200,
              className: 'w-full h-full bg-white'
            }}
          />
        </div>
        <div className="flex justify-between gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex-1"
            onClick={() => sigRef.current?.clear()}
          >
            Clear
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex-1"
            onClick={handleSave}
            disabled={!isSigning}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}