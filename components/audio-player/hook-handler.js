import { useEffect } from 'react';
import { useGlobalState } from '../../utils/global-state';

export function HookHandler(props) {
    const [song, setSong] = useGlobalState('currentSong');
    const {songSelected} = props;
    useEffect(() => {
        setSong(songSelected);
    }, [songSelected, setSong]);

}
