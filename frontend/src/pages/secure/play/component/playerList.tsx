import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonAddPlayer, PlayersTag, Table, TableBody, TableColData, TableColHead, TableHead, TableRow } from "../styles"
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const PlayerList = (props: any) => {
    return <>
        <PlayersTag>{props.title}<ButtonAddPlayer><FontAwesomeIcon icon={faAdd} /> invite </ButtonAddPlayer></PlayersTag>
        <Table>
            <TableHead>
                <TableRow>
                    <TableColHead>No</TableColHead>
                    <TableColHead>Player</TableColHead>
                    <TableColHead>status</TableColHead>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.dataSource.map(({ name, status }: any, index: number) => {
                    return <TableRow key={index}>
                        <TableColData>{index + 1}</TableColData>
                        <TableColData>{name}</TableColData>
                        <TableColData>{status}</TableColData>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </>
}

export default PlayerList;