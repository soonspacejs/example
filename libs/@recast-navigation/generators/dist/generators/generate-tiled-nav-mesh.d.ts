import { FloatArray, IntArray, NavMesh, OffMeshConnectionParams, RawModule, RecastBuildContext, RecastChunkyTriMesh, RecastCompactHeightfield, RecastConfig, RecastContourSet, RecastHeightfield, RecastPolyMesh, RecastPolyMeshDetail, UnsignedCharArray, Vector3Tuple } from '@recast-navigation/core';
import { Pretty } from '../types';
import { OffMeshConnectionGeneratorParams } from './common';
export declare const buildTiledNavMeshRcConfig: ({ recastConfig, navMeshBounds: [navMeshBoundsMin, navMeshBoundsMax], }: {
    recastConfig: RecastConfig;
    navMeshBounds: [min: Vector3Tuple, max: Vector3Tuple];
}) => {
    config: RawModule.rcConfig;
    gridSize: RawModule.RecastCalcGridSizeResult;
    tileSize: number;
    tileWidth: number;
    tileHeight: number;
    tcs: number;
    orig: {
        x: number;
        y: number;
        z: number;
    };
    maxTiles: number;
    maxPolysPerTile: number;
};
export type TiledNavMeshGeneratorConfig = Pretty<RecastConfig & OffMeshConnectionGeneratorParams & {
    /**
     * The minimum and maximum bounds of the heightfield's AABB in world units.
     * If not provided, the bounding box will be calculated from the input positions and indices
     */
    bounds?: [bbMin: Vector3Tuple, bbMax: Vector3Tuple];
    /**
     * @default 128
     */
    chunkyTriMeshTrisPerChunk?: number;
    /**
     * @default true
     */
    buildBvTree?: boolean;
}>;
export declare const tiledNavMeshGeneratorConfigDefaults: {
    chunkyTriMeshTrisPerChunk: number;
    buildBvTree: true;
    borderSize: number;
    tileSize: number;
    cs: number;
    ch: number;
    walkableSlopeAngle: number;
    walkableHeight: number;
    walkableClimb: number;
    walkableRadius: number;
    maxEdgeLen: number;
    maxSimplificationError: number;
    minRegionArea: number;
    mergeRegionArea: number;
    maxVertsPerPoly: number;
    detailSampleDist: number;
    detailSampleMaxError: number;
};
type TileIntermediates = {
    x: number;
    y: number;
    heightfield?: RecastHeightfield;
    compactHeightfield?: RecastCompactHeightfield;
    contourSet?: RecastContourSet;
    polyMesh?: RecastPolyMesh;
    polyMeshDetail?: RecastPolyMeshDetail;
};
type GenerateTileNavMeshDataSuccessResult = {
    success: true;
    data?: UnsignedCharArray;
    intermediates: TileIntermediates;
};
type GenerateTileNavMeshDataFailResult = {
    success: false;
    error: string;
    intermediates: TileIntermediates;
};
export type GenerateTileNavMeshDataResult = GenerateTileNavMeshDataSuccessResult | GenerateTileNavMeshDataFailResult;
export declare const generateTileNavMeshData: (positions: FloatArray, indices: IntArray, rcConfig: RawModule.rcConfig, chunkyTriMesh: RecastChunkyTriMesh, tile: {
    x: number;
    y: number;
    bmin: Vector3Tuple;
    bmax: Vector3Tuple;
}, options?: {
    offMeshConnections?: OffMeshConnectionParams[];
    buildBvTree?: boolean;
}, keepIntermediates?: boolean, buildContext?: RecastBuildContext) => GenerateTileNavMeshDataResult;
export type TiledNavMeshGeneratorIntermediates = {
    type: 'tiled';
    buildContext: RecastBuildContext;
    chunkyTriMesh?: RecastChunkyTriMesh;
    tileIntermediates: TileIntermediates[];
};
type GenerateTiledNavMeshSuccessResult = {
    navMesh: NavMesh;
    success: true;
    intermediates: TiledNavMeshGeneratorIntermediates;
};
type GenerateTiledNavMeshFailResult = {
    navMesh: undefined;
    success: false;
    intermediates: TiledNavMeshGeneratorIntermediates;
    error: string;
};
export type GenerateTiledNavMeshResult = GenerateTiledNavMeshSuccessResult | GenerateTiledNavMeshFailResult;
/**
 * Builds a Tiled NavMesh
 * @param positions a flat array of positions
 * @param indices a flat array of indices
 * @param navMeshGeneratorConfig optional configuration for the NavMesh generator
 * @param keepIntermediates if true intermediates will be returned
 */
export declare const generateTiledNavMesh: (positions: ArrayLike<number>, indices: ArrayLike<number>, navMeshGeneratorConfig?: Partial<TiledNavMeshGeneratorConfig>, keepIntermediates?: boolean) => GenerateTiledNavMeshResult;
export {};
