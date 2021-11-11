import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useConfirmContext } from '~/confirmWindow/ConfirmProvider';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface ConfirmProps{
    text: string
    title?: string
    yesBtnText?: string
    noBtnText?: string
}
// useConfirm hook
let resolveCallback: Function = () => {}
export const useConfirm = () => {
    const {
        setShow, 
        setText, 
        show, 
        text, 
        setYesBtnText, 
        setNoBtnText, 
        setTitle, 
        title, 
        yesBtnText, 
        noBtnText
    } = useConfirmContext()

    const onConfirm = () => {
        setShow(false);
        resolveCallback(true);
    };

    const onCancel = () => {
        setShow(false);
        resolveCallback(false);
    };

    const confirm = (arg: ConfirmProps) => {
        const {title, text, noBtnText, yesBtnText} = arg
        setText(text)
        if(title) setTitle(title)
        if(noBtnText) setNoBtnText(noBtnText)
        if(yesBtnText) setYesBtnText(yesBtnText)
        setShow(true)
        return new Promise((res, rej) => {
            resolveCallback = res
        })
    }

    const confirmState = {
        show, text, yesBtnText, noBtnText, title
    }

    return {confirm, onConfirm, onCancel, confirmState}

}