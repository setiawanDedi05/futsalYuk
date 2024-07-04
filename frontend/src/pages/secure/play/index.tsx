import PlayerList from "./component/playerList"
import { DetailContent, DetailLabel, PlayDetailContainer, PlayerDetailList } from "./styles"

const players = [
    {
        id: '1',
        name: 'Dedi Setiawan',
        avatar: 'https://i.pravatar.cc/100',
        status: 'accepted'
    },
    {
        id: '2',
        name: 'Ibnu Malik',
        avatar: 'https://i.pravatar.cc/100',
        status: 'waiting'
    },
]

export default function PlayPage() {
    return <>
        <PlayDetailContainer>
            <PlayerDetailList>
                <DetailLabel>id</DetailLabel><DetailContent>1234123412</DetailContent>
            </PlayerDetailList>
            <PlayerDetailList>
                <DetailLabel>PIC</DetailLabel><DetailContent>Dedi</DetailContent>
            </PlayerDetailList>
            <PlayerDetailList>
                <DetailLabel>place</DetailLabel><DetailContent>Gor Sukses, Sudirman,Jakarta Selatan</DetailContent>
            </PlayerDetailList>
            <PlayerDetailList>
                <DetailLabel>time</DetailLabel><DetailContent>4 July 2024</DetailContent>
            </PlayerDetailList>
            <PlayerDetailList>
                <DetailLabel>payment per person</DetailLabel><DetailContent>50000</DetailContent>
            </PlayerDetailList>
            <PlayerDetailList>
                <DetailLabel>total payment</DetailLabel><DetailContent>1000000</DetailContent>
            </PlayerDetailList>
        </PlayDetailContainer>
        <PlayerList title="Players" dataSource={players}/>
    </>
}