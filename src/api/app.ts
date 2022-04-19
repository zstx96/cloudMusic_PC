import { Banner } from "@/interface/interface";
import Service from "@/utils/Service";


export function homePage() { }

export function getBanners() {
    return Service.get<{ banners: Banner[] }>('/banner?type=2')
}
export function getDragonBalls() {
    return Service.get("/homepage/dragon/ball")
}