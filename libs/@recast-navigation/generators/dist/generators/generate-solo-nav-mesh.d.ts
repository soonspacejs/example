import { NavMesh, RecastBuildContext, RecastCompactHeightfield, RecastConfig, RecastContourSet, RecastHeightfield, RecastPolyMesh, RecastPolyMeshDetail, UnsignedCharArray, Vector3Tuple } from '@recast-navigation/core';
import { Pretty } from '../types';
import { OffMeshConnectionGeneratorParams } from './common';
export type SoloNavMeshGeneratorConfig = Pretty<Omit<RecastConfig, 'tileSize'> & OffMeshConnectionGeneratorParams & {
    /**
     * @default true
     */
    buildBvTree?: boolean;
    /**
     * The minimum and maximum bounds of the heightfield's AABB in world units.
     * If not provided, the bounding box will be calculated from the input positions and indices
     */
    bounds?: [bbMin: Vector3Tuple, bbMax: Vector3Tuple];
}>;
export declare const soloNavMeshGeneratorConfigDefaults: {
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
export type SoloNavMeshGeneratorIntermediates = {
    type: 'solo';
    buildContext: RecastBuildContext;
    heightfield?: RecastHeightfield;
    compactHeightfield?: RecastCompactHeightfield;
    contourSet?: RecastContourSet;
    polyMesh?: RecastPolyMesh;
    polyMeshDetail?: RecastPolyMeshDetail;
};
type GenerateSoloNavMeshDataSuccessResult = {
    navMeshData: UnsignedCharArray;
    success: true;
    intermediates: SoloNavMeshGeneratorIntermediates;
};
type GenerateSoloNavMeshDataFailResult = {
    navMeshData: undefined;
    success: false;
    intermediates: SoloNavMeshGeneratorIntermediates;
    error: string;
};
export type GenerateSoloNavMeshDataResult = GenerateSoloNavMeshDataSuccessResult | GenerateSoloNavMeshDataFailResult;
/**
 * Builds Solo NavMesh data from the given positions and indices.
 * @param positions a flat array of positions
 * @param indices a flat array of indices
 * @param navMeshGeneratorConfig optional configuration for the NavMesh generator
 * @param keepIntermediates if true intermediates will be returned
 */
export declare const generateSoloNavMeshData: (positions: ArrayLike<number>, indices: ArrayLike<number>, navMeshGeneratorConfig?: Partial<SoloNavMeshGeneratorConfig>, keepIntermediates?: boolean) => GenerateSoloNavMeshDataResult;
type GenerateSoloNavMeshSuccessResult = {
    navMesh: NavMesh;
    success: true;
    intermediates: SoloNavMeshGeneratorIntermediates;
};
type GenerateSoloNavMeshFailResult = {
    navMesh: undefined;
    success: false;
    intermediates: SoloNavMeshGeneratorIntermediates;
    error: string;
};
export type GenerateSoloNavMeshResult = GenerateSoloNavMeshSuccessResult | GenerateSoloNavMeshFailResult;
/**
 * Builds a Solo NavMesh from the given positions and indices.
 * @param positions a flat array of positions
 * @param indices a flat array of indices
 * @param navMeshGeneratorConfig optional configuration for the NavMesh generator
 * @param keepIntermediates if true intermediates will be returned
 */
export declare const generateSoloNavMesh: (positions: ArrayLike<number>, indices: ArrayLike<number>, navMeshGeneratorConfig?: Partial<SoloNavMeshGeneratorConfig>, keepIntermediates?: boolean) => GenerateSoloNavMeshResult;
export {};
