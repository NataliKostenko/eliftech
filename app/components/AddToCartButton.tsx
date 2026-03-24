export interface AddToCartButtonProps {
  name: string;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  return (
    <button
      className="    
    p-2
    mt-3   
    w-42
    h-10
    text-center
    bg-transparent hover:bg-cyan-500 active:bg-cyan-700 
    border
    border-solid
    rounded-md
    border-grey-100
    ml-10
    "
    >
      {props.name}
    </button>
  );
}
